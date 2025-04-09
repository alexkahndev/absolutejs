import { rm, mkdir, writeFile } from "node:fs/promises";
import { join, basename } from "node:path";
import { exit } from "node:process";
import { $, build as bunBuild, Glob } from "bun";
import {
	MILLISECONDS_IN_A_MINUTE,
	MILLISECONDS_IN_A_SECOND,
	TIME_PRECISION
} from "../constants";

const projectRoot = join(import.meta.dir, "..", "..");
const buildDir = join(projectRoot, "example/build");
const assetsDir = join(projectRoot, "example/assets");
const reactIndexDir = join(projectRoot, "example/react/indexes");
const javascriptDir = join(projectRoot, "example/javascript");
const typeScriptDir = join(projectRoot, "example/typescript");
const reactPagesDir = join(projectRoot, "example/react/pages");

export const build = async () => {
	const start = performance.now();

	await rm(buildDir, { force: true, recursive: true });
	await generateReactIndexFiles();

	const reactEntryGlob = new Glob("*.{tsx,jsx}");
	const reactEntryPaths: string[] = [];
	for await (const file of reactEntryGlob.scan({
		absolute: true,
		cwd: reactIndexDir
	})) {
		reactEntryPaths.push(file);
	}

	const javascriptEntryGlob = new Glob("*.js");
	const javascriptEntryPaths: string[] = [];
	for await (const file of javascriptEntryGlob.scan({
		absolute: true,
		cwd: javascriptDir
	})) {
		javascriptEntryPaths.push(file);
	}

	const typeScriptEntryGlob = new Glob("*.ts");
	const typeScriptEntryPaths: string[] = [];
	for await (const file of typeScriptEntryGlob.scan({
		absolute: true,
		cwd: typeScriptDir
	})) {
		typeScriptEntryPaths.push(file);
	}
	const entryPaths = reactEntryPaths
		.concat(javascriptEntryPaths)
		.concat(typeScriptEntryPaths);

	const { logs, outputs } = await bunBuild({
		entrypoints: entryPaths,
		format: "esm",
		naming: `[dir]/[name].[hash].[ext]`,
		outdir: buildDir
	}).catch((error) => {
		console.error("Build failed:", error);
		exit(1);
	});

	logs.forEach((log) => {
		if (log.level === "error") console.error(log);
		else if (log.level === "warning") console.warn(log);
		else if (log.level === "info" || log.level === "debug")
			console.info(log);
	});

	await copyAssetsToBuildDir();

	// TODO: Find a way to make this type-safe instead of string as the key it should be enumerated with the names of the files
	const manifest = outputs.reduce<Record<string, string>>((acc, artifact) => {
		let relativePath = artifact.path;

		if (relativePath.startsWith(buildDir)) {
			relativePath = relativePath.slice(buildDir.length);
		}

		relativePath = relativePath.replace(/^\/+/, "");

		const baseName = relativePath.split("/").pop();
		if (!baseName) return acc;

		const hashDelimiter = `.${artifact.hash}.`;
		if (!baseName.includes(hashDelimiter)) {
			throw new Error(
				`Expected hash delimiter ${hashDelimiter} in ${baseName}`
			);
		}

		const [fileName] = baseName.split(hashDelimiter);
		acc[fileName] = "/" + relativePath;
		return acc;
	}, {});

	const end = performance.now();
	const durationMs = end - start;
	let duration;
	if (durationMs < MILLISECONDS_IN_A_SECOND) {
		duration = `${durationMs.toFixed(TIME_PRECISION)}ms`;
	} else if (durationMs < MILLISECONDS_IN_A_MINUTE) {
		duration = `${(durationMs / MILLISECONDS_IN_A_SECOND).toFixed(TIME_PRECISION)}s`;
	} else {
		duration = `${(durationMs / MILLISECONDS_IN_A_MINUTE).toFixed(TIME_PRECISION)}m`;
	}
	console.log(`Build completed in ${duration}`);

	return manifest;
};

const copyAssetsToBuildDir = async () => {
	await $`cp -R ${assetsDir} ${buildDir}`;
	await mkdir(join(buildDir, "html"));
	await mkdir(join(buildDir, "htmx"));

	await $`cp -R ${join(projectRoot, "example/html")} ${join(buildDir)}`;
	await $`cp -R ${join(projectRoot, "example/htmx")} ${join(buildDir)}`;
};

const generateReactIndexFiles = async () => {
	await rm(reactIndexDir, { force: true, recursive: true });
	await mkdir(reactIndexDir);

	const pagesGlob = new Glob("*.*");
	const files: string[] = [];
	for await (const file of pagesGlob.scan({ cwd: reactPagesDir })) {
		files.push(file);
	}
	const promises = files.map(async (file) => {
		const fileName = basename(file);
		const [componentName] = fileName.split(".");
		const content = [
			`import { hydrateRoot } from 'react-dom/client';`,
			`import { ${componentName} } from '../pages/${componentName}';\n`,
			`hydrateRoot(document, <${componentName} />);`
		].join("\n");

		return writeFile(
			join(reactIndexDir, `${componentName}Index.tsx`),
			content
		);
	});
	await Promise.all(promises);
};
