import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { renderToReadableStream } from "react-dom/server.browser";
import { swagger } from "@elysiajs/swagger";
import { ComponentType, createElement } from "react";
import { build } from "./build";
import { serverTiming } from "@elysiajs/server-timing";
import { ReactHome } from "./react/pages/ReactHome";

const host = Bun.env.HOST || "localhost";
const port = Bun.env.PORT || 3000;

await build();

let counter = 0;

async function handleReactRequest(pageComponent: ComponentType, index: string) {
	const page = createElement(pageComponent);
	const stream = await renderToReadableStream(page, {
		bootstrapScripts: [index]
	});

	return new Response(stream, {
		headers: { "Content-Type": "text/html" }
	});
}

async function handleSvelteRequest(pageName: string) {
}

export const server = new Elysia()

	.use(
		staticPlugin({
			assets: "./build",
			prefix: ""
		})
	)
	.use(serverTiming())
	.use(swagger())
	.get("/", () => Bun.file("./build/html/indexes/HtmlHomeIndex.html"))
	.get("/react", () =>
		handleReactRequest(ReactHome, "./react/indexes/ReactHomeIndex.js")
	)
	.get("/htmx", () => Bun.file("./build/htmx/HtmxHome.html"))
	.get("/htmx/increment", () => {
        counter++; // Increment the counter
        return new Response(counter.toString(), {
            headers: { "Content-Type": "text/plain" }
        });
    })
	.get("/svelte", () => handleSvelteRequest("SvelteHome"))
	.listen(port, () => {
		console.log(`server started on http://${host}:${port}`);
	})
	.on("error", (error) => {
		console.error(`Server error: ${error.code}`);
	});
