<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!doctype html>
<html lang="en-us">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" />

	<title>WYGIWiki</title>

	<style>
		.cke_dialog_ui_input_textarea {
			height: 330px !important;
		}
	</style>
</head>
<body>
	<nav class="navbar navbar-dark bg-primary">
		<span class="navbar-brand">
			WYGI<span class="text-warning">Wiki</span>
		</span>
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

			var DOM = {};

			DOM.input = CKEDITOR.replace("editor", {
				format_tags: "p;h2;h3;h4",
				removeButtons: "",
				customValues: { convert_url: "/api/content.svc/ConvertContent" },
				extraPlugins: "wygiwiki",
				skin: "bootstrapck,https://cdn.jsdelivr.net/gh/Kunstmaan/BootstrapCK4-Skin@1.0.0/skins/bootstrapck/",
				toolbar: [
					[ "Wygiwiki" ],
					[ "Undo", "Redo"],
					[ "Cut", "Copy", "Paste", "PasteText" ],
					[ "Format", "Bold", "Italic", "-", "RemoveFormat" ],
					[ "BulletedList", "NumberedList", "Outdent", "Indent" ],
					[ "Link", "Unlink" ],
					["Image", "Table", "SpecialChar" ],
					[ "Source" ],
					[ "Maximize", "About" ]
				],
				height: "500px"
			});
		} ());
	</script>
</body>
</html>
