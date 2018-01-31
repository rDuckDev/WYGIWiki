(function () {
	"use strict";

	var DOM = {};

	const dialogTitle = "Convert markup";

	// dialog controls
	var wikiOutput = { type: "textarea", id: "wikiOutput", onLoad: setReadOnly };

	function setReadOnly () { this.getInputElement().setAttribute("readOnly", true); }
	function convertContent () {
		var currentDialog = DOM.dialog.contents;

		var editor = DOM.dialog.editor,
			url = editor.config.customValues.convert_url,
			data = { obj: { htmlContent: editor.getData() } };

		if (!url) return;

		if (!data.obj.htmlContent) {
			CKEDITOR.dialog.getCurrent().hide();

			alert("Please enter content into the editor first.");

			return;
		}

		jQuery.ajax({
			url: url,
			data: JSON.stringify(data)
		}).done(function (data) {
			var value = data.ConvertContentResult;

			currentDialog.toWiki.wikiOutput.setValue(value);
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
				elements: [wikiOutput]
			}],
			onLoad: function () { DOM.dialog = this._; },
			onShow: convertContent,
			buttons: []
		}
	});
} ());