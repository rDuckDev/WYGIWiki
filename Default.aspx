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

		} ());
	</script>
</body>
</html>
