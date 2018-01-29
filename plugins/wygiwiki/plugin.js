(function () {
	"use strict";

	var DOM = {};

	const dialogTitle = "Convert markup";

		// toWiki controls
	var wikiOutput = { type: "textarea", id: "wikiOutput", onLoad: setReadOnly },
		submitHTML = { type: "button", id: "submitHTML", label: "Convert to MediaWiki", onClick: convertToWiki },
		// toHTML controls
		wikiInput = { type: "textarea", id: "wikiInput" },
		submitWiki = { type: "button", id: "submitWiki", label: "Convert to HTML", onClick: convertToHTML };

	function setReadOnly () { this.getInputElement().setAttribute("readOnly", true); }
	function convertToWiki () { convertContent("html"); }
	function convertToHTML () { convertContent("wiki"); }
	function convertContent (currentFormat) {
		var editor = DOM.dialog.editor,
			url = editor.config.customValues.convert_url,
			data = { obj: {} },
			rawContent = "";

		if (!url || !currentFormat) return;

		if (currentFormat === "html") data.obj.htmlContent = editor.getData();
		if (currentFormat === "wiki") data.obj.wikiContent = DOM.dialog.contents.toHTML.wikiInput.getValue();

		if (!data.obj.htmlContent && !data.obj.wikiContent) {
			if (currentFormat === "html") {
				alert("Please enter something into the editor first.");

				CKEDITOR.dialog.getCurrent().hide();
			}
			if (currentFormat === "wiki") {
				alert("Please enter something into the textbox first.");

				DOM.dialog.contents.toHTML.wikiInput.focus();
			}

			return;
		}

		jQuery.ajax({
			url: url,
			data: JSON.stringify(data)
		}).done(function (data) {
			var value = data.ConvertContentResult;

			if (currentFormat === "html") DOM.dialog.contents.toWiki.wikiOutput.setValue(value);
			if (currentFormat === "wiki") {
				editor.setData(value);

				CKEDITOR.dialog.getCurrent().hide();
			}
		});
	}
	CKEDITOR.plugins.add("wygiwiki", {
		icons: "wygiwiki",
		init: function (editor) {
			editor.addCommand("convertMarkup", new CKEDITOR.dialogCommand("wygiwikiDialog"));
			editor.ui.addButton("Wygiwiki", {
				label: dialogTitle,
				command: "convertMarkup"
			});
		}
	});
	CKEDITOR.dialog.add("wygiwikiDialog", function (editor) {
		return {
			title: dialogTitle,
			contents: [{
				id: "toWiki",
				label: "To MediaWiki",
				elements: [submitHTML, wikiOutput]
			}, {
				id: "toHTML",
				label: "From MediaWiki",
				elements: [wikiInput, submitWiki]
			}],
			onLoad: function () { DOM.dialog = this._; },
			buttons: []
		}
	});
} ());