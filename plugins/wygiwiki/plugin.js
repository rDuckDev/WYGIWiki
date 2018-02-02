(function () {
	"use strict";

	var DOM = {};

	const dialogTitle = "WYGIWiki";

	// dialog controls
	var wikiOutput = { type: "textarea", id: "wikiOutput", rows: 20, cols: 30 },
		loadingMessage = { type: "html", id: "loadingMessage", html: "<span><img src='/plugins/wygiwiki/icons/spinner.gif' style='width:12px;height:12px;' /> Converting</span>" };

	function formatWikiURL (url) {
		// tweak the URL for easier regex matching of internal links
		return url.toLowerCase()
			.replace("https://", "")
			.replace("http://", "")
			.replace("main_page", "")
	}
	function fixInternalLinks (content, url) {
		if (!url) return content;

		var localURL = new RegExp("(https*://)*" + url, "gi");
		
		return content.replace(localURL, "");
	}
	function convertContent () {
		var currentDialog = DOM.dialog.contents;

		var editor = DOM.dialog.editor,
			apiURL = editor.config.customValues.api_url,
			wikiURL = formatWikiURL(editor.config.customValues.wiki_url),
			data = { obj: { htmlContent: fixInternalLinks(editor.getData(), wikiURL) } };

		if (!apiURL) return;

		if (!data.obj.htmlContent) {
			CKEDITOR.dialog.getCurrent().hide();

			alert("Please enter content into the editor first.");

			return;
		}

		// make sure the loading message is visible
		currentDialog.convertContent.loadingMessage.getElement().show();

		jQuery.ajax({
			url: apiURL,
			data: JSON.stringify(data)
		}).done(function (data) {
			var value = data.ConvertContentResult;

			currentDialog.convertContent.wikiOutput.setValue(value);
		}).fail(function () {
			currentDialog.convertContent.wikiOutput.setValue("Your content could not be converted.\n\n" +
				"Please double check your network connection and try again.");
		}).always(function () {
			currentDialog.convertContent.loadingMessage.getElement().hide();
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
			buttons: []
		}
	});
} ());