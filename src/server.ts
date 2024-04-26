import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { renderToReadableStream } from "react-dom/server.browser";
import { swagger } from "@elysiajs/swagger";
import { ComponentType, createElement } from "react";
import Home from "./pages/Home";
import { build } from "./build";

const host = Bun.env.HOST || "localhost";
const port = Bun.env.PORT || 3000;

await build();

async function handleRequest(pageComponent: ComponentType, index: string) {
	const page = createElement(pageComponent);
	const stream = await renderToReadableStream(page, {
		bootstrapScripts: [index]
	});

	return new Response(stream, {
		headers: { "Content-Type": "text/html" }
	});
}

export const server = new Elysia()

	.use(
		staticPlugin({
			assets: "./build",
			prefix: ""
		})
	)
	.use(swagger())
	.get("/", () => handleRequest(Home, "/HomeIndex.js"))
	.listen(port, () => {
		console.log(`server started on http://${host}:${port}`);
	})
	.on("error", (error) => {
		console.error(`Server error: ${error.code}`);
	});
