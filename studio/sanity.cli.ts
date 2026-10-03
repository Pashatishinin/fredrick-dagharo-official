import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
	api: {
		projectId: "a36murzz",
		dataset: "production",
	},
	deployment: {
		appId: "xpwgtx8lw62vhsspmuzakk4u",

		/**
		 * Enable auto-updates for studios.
		 * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
		 */
		autoUpdates: true,
	},
});
