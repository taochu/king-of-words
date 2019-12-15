Package.describe({
	name: "king-of-words:styles",
	summary: "king of words styles",
	version: "0.0.1"
});

Package.onUse(function(api) {
	api.versionsFrom("METEOR@1.3");
	api.use(["fourseven:scss"], "client");

	api.addFiles(
		[
			// Bottelio theme common imports
			"client/imports/_mixins.import.scss",
			"client/imports/_helpers.import.scss"
		],
		["client"],
		{ isImport: true }
	);

	api.addFiles(
		[
			// partials
			"client/styles/_components.scss",

			//sources
			"client/styles/app.scss"
		],
		["client"]
	);
});
