<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!doctype html>
<html lang="en-us">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" />

	<title>WYGIWiki</title>
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
				format_nowiki: { name: "No wiki", element: "nowiki" }, // <nowiki>
				format_tags: "p;h2;h3;h4;nowiki",
				removeButtons: "",
				toolbar: [[
					"Undo", "Redo", "-",
					"Cut", "Copy", "Paste", "PasteText", "-",
					"Format", "Bold", "Italic", "-", "RemoveFormat", "-",
					"BulletedList", "NumberedList", "Outdent", "Indent", "-",
					"Link", "Unlink", "-",
					"Image", "Table", "SpecialChar", "-",
					"Source", "-",
					"Maximize", "About"
				]],
				height: "500px"
			});
		} ());
	</script>
</body>
</html>
