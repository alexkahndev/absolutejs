import svelte from "rollup-plugin-svelte";
import css from "rollup-plugin-css-only";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
	input: "src/svelte/pages/SvelteHome.svelte",
	output: {
		dir: "build/svelte/indexes",
		format: "es" as const
	},
	plugins: [
		nodeResolve(),
		svelte({
			compilerOptions: {
				generate: "ssr"
			}
		}),
		css({ output: "SvelteHome.css" }),
		terser()
	]
};
