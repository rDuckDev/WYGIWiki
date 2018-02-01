<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!doctype html>
<html lang="en-us">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" />

	<title>WYGIWiki</title>

	<style>
		.cke_button__wygiwiki_label { display: inline !important; }
	</style>
</head>
<body>
	<nav class="navbar navbar-dark bg-dark">
		<a href="https://github.com/rDuckDev/WYGIWiki" target="_blank" class="navbar-brand">
			WYGI<span class="text-warning">Wiki</span>
		</a>
		<div class="form-inline">
			<input id="wikiURL" type="text" size="60" class="form-control text-center" placeholder="Main_Page URL" />
		</div>
	</nav>
	<textarea id="editor"></textarea>
	<div class="text-muted text-center my-1">
		Copyright &copy; 2018 Jonathan Hermsen
	</div>

	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/ckeditor@4.8.0/ckeditor.js"></script>
	<script type="text/javascript">
		CKEDITOR.plugins.addExternal("wygiwiki", "/plugins/wygiwiki/", "plugin.min.js");
		jQuery.ajaxSetup({
			type: "POST",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			processData: false,
			async: true,
			cache: false
		});

		(function () {
			"use strict";

				removeButtons: "",
			const EDITOR_KEY = "EditorContent",
				URL_KEY = "WikiURL",
				defaultWikiURL = "en.wikipedia.org/wiki/Main_Page";

			var DOM = {};

			DOM.wikiURL = jQuery("#wikiURL");
			DOM.editor = CKEDITOR.replace("editor", {
				format_nowiki: { name: "No wiki", element: "nowiki" }, // <nowiki>
				format_tags: "p;h2;h3;h4;nowiki",
				extraPlugins: "wygiwiki",
				skin: "moono",
				toolbar: [
					[ "Undo", "Redo"],
					[ "Cut", "Copy", "Paste", "PasteText" ],
					[ "Format", "Bold", "Italic", "-", "RemoveFormat" ],
					[ "BulletedList", "NumberedList", "Outdent", "Indent" ],
					[ "Link", "Unlink", "-", "Image", "Table", "SpecialChar" ],
					[ "Source" ], [ "Wygiwiki" ],
					[ "Maximize", "About" ]
				],
				customValues: {
					api_url: "/api/content.svc/ConvertContent",
					wiki_url: localStorage.getItem(URL_KEY) || defaultWikiURL
				},
				height: "500px"
			});

			function updateURL () {
				var sender = jQuery(this),
					value = sender.val();

				value = value.replace("https://", "").replace("http://", "").trim() || defaultWikiURL;

				sender.val(value);

				DOM.editor.config.customValues.wiki_url = value;
			}

			jQuery(document).ready(function () {
				DOM.editor.setData(localStorage.getItem(EDITOR_KEY));
				DOM.wikiURL.val(localStorage.getItem(URL_KEY) || defaultWikiURL);

				DOM.wikiURL.on("change", updateURL);
			});
			jQuery(window).on("beforeunload", function () {
				localStorage.setItem(EDITOR_KEY, DOM.editor.getData());
				localStorage.setItem(URL_KEY, DOM.wikiURL.val());
			});
		} ());
	</script>
</body>
</html>
