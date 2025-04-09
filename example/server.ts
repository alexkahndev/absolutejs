import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { serverTiming } from "@elysiajs/server-timing";
import { ReactHome } from "./react/pages/ReactHome";
import { handleHTMLPageRequest, handleReactPageRequest } from "../src/core/pageHandlers";
import { build } from "../src/core/build";

const host = Bun.env.HOST || "localhost";
const port = Bun.env.PORT || 3000;

const manifest = await build();

let counter = 0;

export const server = new Elysia()

	.use(
		staticPlugin({
			assets: "./example/build",
			prefix: ""
		})
	)
	.use(serverTiming())
	.use(swagger())
	.get("/", () => handleHTMLPageRequest("./example/build/html/HtmlHomeIndex.html"))
	.get("/react", () =>
		handleReactPageRequest(ReactHome, manifest["ReactHomeIndex"])
	)
	.get("/htmx", () => Bun.file("./example/build/htmx/HtmxHome.html"))
	.get("/htmx/increment", () => {
		counter++;
		return new Response(counter.toString(), {
			headers: { "Content-Type": "text/plain" }
		});
	})
	.listen(port, () => {
		console.log(`server started on http://${host}:${port}`);
	})
	.on("error", (error) => {
		const { request } = error;
		console.error(
			`Server error on ${request.method} ${request.url}: ${error.message}`
		);
	});
