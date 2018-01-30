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
		var currentDialog = DOM.dialog.contents;

		var editor = DOM.dialog.editor,
			url = editor.config.customValues.convert_url,
			data = { obj: {} },
			rawContent = "";

		if (!url || !currentFormat) return;

		if (currentFormat === "html") data.obj.htmlContent = editor.getData();
		if (currentFormat === "wiki") data.obj.wikiContent = currentDialog.toHTML.wikiInput.getValue();

		if (!data.obj.htmlContent && !data.obj.wikiContent) {
			if (currentFormat === "html") {
				alert("Please enter something into the editor first.");

				CKEDITOR.dialog.getCurrent().hide();
			}
			if (currentFormat === "wiki") {
				alert("Please enter something into the textbox first.");

				currentDialog.toHTML.wikiInput.focus();
			}

			return;
		}

		// disable buttons while content is submitting
		// in order to prevent multiple submissions
		currentDialog.toHTML.submitWiki.disable();
		currentDialog.toWiki.submitHTML.disable();

		jQuery.ajax({
			url: url,
			data: JSON.stringify(data)
		}).done(function (data) {
			var value = data.ConvertContentResult;

			if (currentFormat === "html") currentDialog.toWiki.wikiOutput.setValue(value);
			if (currentFormat === "wiki") {
				editor.setData(value);

				CKEDITOR.dialog.getCurrent().hide();
			}
		}).always(function () {
			currentDialog.toHTML.submitWiki.enable();
			currentDialog.toWiki.submitHTML.enable();
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