import { readdir, writeFile, rm, mkdir } from "node:fs/promises";
import { extname, join } from "node:path";
import shell from "shelljs";
import { rollup } from "rollup";
import rollupConfig from "../rollup.config";

const buildDir = "./build";
const assetsDir = "./src/assets";

const reactIndexDir = "./src/react/indexes";
const javascriptDir = "./src/html/scripts";
const sveltePagesDir = "./src/svelte/pages";

const reactPagesDir = "./src/react/pages";

export async function build() {
	await rm(buildDir, { recursive: true, force: true });
	await generateReactIndexFiles();

	const reactFiles = await readdir(reactIndexDir);
	const javascriptFiles = await readdir(javascriptDir);

	const reactEntryPoints = reactFiles.filter(
		(file) => extname(file) === ".tsx"
	);
	const javascriptEntryPoints = javascriptFiles.filter(
		(file) => extname(file) === ".js"
	);

	const entryPaths = reactEntryPoints
		.map((file) => join(reactIndexDir, file))
		.concat(javascriptEntryPoints.map((file) => join(javascriptDir, file)));

	const { logs, success } = await Bun.build({
		entrypoints: entryPaths,
		outdir: "./build",
		minify: true
	});

	if (!success) {
		throw new AggregateError(logs);
	}

	// Build Svelte components
	// const bundle = await rollup(rollupConfig);

	// await bundle.write({
	// 	dir: "build/svelte",
	// 	format: "es"
	// });

	await copyAssetsToBuildDir();
}

async function copyAssetsToBuildDir() {
	// Copy assets
	shell.cp("-R", assetsDir, buildDir);

	// Create build/html/indexes directory if it doesn't exist
	shell.mkdir("-p", `${buildDir}/html/indexes`);

	// Create htmx
	shell.mkdir("-p", `${buildDir}/htmx`);

	// Copy HTML files
	shell.cp("-R", "./src/html/indexes/*", `${buildDir}/html/indexes`);

	// Copy htmx files
	shell.cp("-R", "./src/htmx/*", `${buildDir}/htmx/`);
}

async function generateReactIndexFiles() {
	await rm(reactIndexDir, { recursive: true, force: true });
	await mkdir(reactIndexDir);

	try {
		const files = await readdir(reactPagesDir);

		for (const file of files) {
			const componentName = file.split(".")[0];

			const content = [
				'import { hydrateRoot } from "react-dom/client";',
				`import { ${componentName} } from "../pages/${componentName}";\n`,
				`hydrateRoot(document, <${componentName} />);`
			].join("\n");

			await writeFile(
				join(reactIndexDir, `${componentName}Index.tsx`),
				content
			);
		}
	} catch (error) {
		console.error(`Error generating index files: ${error}`);
	}
}
