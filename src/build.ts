import { readdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

export async function build() {
	await generateIndexFiles();
	const entryDir = "./src/indexes";
	const files = await readdir(entryDir);
	const entrypoints = files.filter((file) => extname(file) === ".tsx");
	const entryPaths = entrypoints.map((file) => join(entryDir, file));
	await Bun.build({
		entrypoints: entryPaths,
		outdir: "./build",
		minify: true
	});
}

async function generateIndexFiles() {
    const pagesDir = "./src/pages";
    const indexDir = "./src/indexes";
  
    try {
      const files = await readdir(pagesDir);
  
      for (const file of files) {
        // Get the component name without the .tsx extension
        const componentName = file.split(".")[0];
  
        const content = [
          'import { hydrateRoot } from "react-dom/client";',
          `import ${componentName} from "../pages/${componentName}";`,
          `hydrateRoot(document, <${componentName} />);`
        ].join('\n');
  
        await writeFile(
          join(indexDir, `${componentName}Index.tsx`),
          content
        );
      }
    } catch (error) {
      console.error(`Error generating index files: ${error}`);
    }
  }
  