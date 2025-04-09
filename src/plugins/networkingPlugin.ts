import { argv } from "node:process";
import { env } from "bun";
import { Elysia } from "elysia";
import { getLocalIPAddress } from "../utils/networking";
import { DEFAULT_PORT } from "../constants";

let host = env.HOST ?? "localhost";
const port = env.PORT ?? DEFAULT_PORT;
let localIP: string | undefined;

const args = argv;
const hostFlag = args.includes("--host");

if (hostFlag) {
	localIP = getLocalIPAddress();
	host = "0.0.0.0";
}

export const networkingPlugin = (app: Elysia) =>
	app.listen(
		{
			hostname: host,
			port: port
		},
		() => {
			if (hostFlag) {
				console.log(`Server started on http://localhost:${port}`);
				console.log(
					`Server started on network: http://${localIP}:${port}`
				);
			} else {
				console.log(`Server started on http://${host}:${port}`);
			}
		}
	);
