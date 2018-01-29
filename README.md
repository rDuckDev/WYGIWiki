# WYGIWiki (What You Get Is Wiki)

A lightweight WYSIWYG editor for basic MediaWiki markup.

This project is not a replacement for powerful extensions like [VisualEditor](https://www.mediawiki.org/wiki/Extension:VisualEditor).

## Scope

* Editing very basic MediaWiki content
* Teaching new users MediaWiki markup
* Editing private wikis which don't have VisualEditor
* Converting simple documents into MediaWiki markup
  * Markdown
  * HTML
  * Word
  * PDF
  * etc.

## Limitations

* Unsupported
  * {{templates}}
  * gallery
  * nowiki
  * etc.
* Tables
  *  *Must* have equal rows and columns
  * Cannot contain links (or other content) which uses pipes

## Credits

* [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki): markup
* [Pandoc](http://pandoc.org/): markup conversion
* [CKEditor 4](https://ckeditor.com/ckeditor-4/): WYSIWYG editor
* [BootstrapCK4-Skin](https://github.com/Kunstmaan/BootstrapCK4-Skin) by Kunstmaan: CKEditor skin
* [Bootstrap 4](http://getbootstrap.com/): UI and theme
* [WikiEditor](https://www.mediawiki.org/wiki/Extension:WikiEditor): UI inspiration
* [jQuery](http://jquery.com/): Ajax and keeping things simple

## License

WYGIWiki is copyright © 2018+ Jonathan Hermsen and released under the MIT license.