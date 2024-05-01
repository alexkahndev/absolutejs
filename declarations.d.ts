declare module "*.svg" {
	const content: any;
	export default content;
}

declare module "*.mp4" {
	const content: any;
	export default content;
}

declare module "*.html" {
	const content: string;
	export default content;
}

declare module "*.vue" {
	import { defineComponent } from "vue";
	const component: ReturnType<typeof defineComponent>;
	export default component;
}
