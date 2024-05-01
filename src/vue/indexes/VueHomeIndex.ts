import { createApp } from "vue";
import VueHome from "../pages/VueHome.vue";

window.onload = () => {
	const app = createApp(VueHome);
	app.mount("html");
};
