(function () {
	"use strict";

	var DOM = {};

	const dialogTitle = "Convert markup";

	// dialog controls
	var wikiOutput = { type: "textarea", id: "wikiOutput", rows: 20, cols: 30 },
		loadingMessage = { type: "html", id: "loadingMessage", html: "<span><img src='/plugins/wygiwiki/icons/spinner.gif' style='width:12px;height:12px;' /> Loading</span>" };

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

		// make sure the loading message is visible
		currentDialog.convertContent.loadingMessage.getElement().show();

		jQuery.ajax({
			url: url,
			data: JSON.stringify(data)
		}).done(function (data) {
			var value = data.ConvertContentResult;

			currentDialog.convertContent.loadingMessage.getElement().hide();

			currentDialog.convertContent.wikiOutput.setValue(value);
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
				id: "convertContent",
				label: "To MediaWiki",
				elements: [loadingMessage, wikiOutput]
			}],
			onLoad: function () { DOM.dialog = this._; },
			onShow: convertContent,
			buttons: [ CKEDITOR.dialog.okButton ]
		}
	});
} ());