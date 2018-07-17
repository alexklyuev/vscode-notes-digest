# Notes Digest

Shows notes with a certain prefix in your project files as a tree view.

By default shows lines with `TODO:` or `FIXME:` prefix within `.ts` and `.js` files.

![Demo](https://raw.githubusercontent.com/alexklyuev/vscode-notes-digest/master/docs/demo.png)

## Configuration

`notesDigest.globPattern` - files to search, defaults are typescript and javascript files, node_modules ignored.

`notesDigest.textMarkers` - prefixes to search and show, default `["TODO:", "FIXME:"]`.

`notesDigest.noteFormat` - string format in which note will be represented, uses some predefinied variables started with `%`.

Default format is `"%textMarkerLowerCase [%lineNumber:%columnNumber] %noteText"` (result is shown on demo screenshot).

Available variables are:
 - `%textMarkerBase`
 - `%textMarkerLowerCase`
 - `%textMarkerUpperCase`
 - `%lineNumber`
 - `%columnNumber`
 - `%noteText`
