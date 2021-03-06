# Known Bugs and To-Do List

## TinyMCE UI

* Code toolbar button needs rework.
* Format -> Code missing from pop-up toolbar.
* Toolbar wrap on narrow width not working.
* Image insert -> puts URL. Do custom images dialogue menu with both image URL and image file -> blob options.
* Can fix tables with custom dialog menu + insert table (instead of tableInsertDialog menu).
* Formatting button is non-ideal... change back to heading button/menu?
* With heading toolbar button and extra formats drop-down buttons the buttons aren't highlighted when formats are active.
  * Option?: addToggleMenuItem() -> https://www.tiny.cloud/docs/api/tinymce.editor.ui/tinymce.editor.ui.registry/#addtogglemenuitem
    * https://www.tiny.cloud/docs/ui-components/menuitems/#togglemenuitems
* Preferences option to hide menu bar? (With alternatives for interaction.)
* Formatting buttons (e.g., bold) don't work with markdown editor.
* Dropdown buttons (extra formatting and markdown) aren't showing on mobile due to sliding toolbar...
* Editor doesn't get focus on launch in app mode?

## Custom UI

* Scrollbar sync doesn't scroll at bottom completely for the other scrollbar if smaller.
* Need to make scrollbars sync again after updating panes.
* Markdown editor isn't updating HTML editor on new lines or spaces... only characters.
* Maybe use this instead of saving the info in variable (but would conflict if additional sidebars in future):
  * `tinymce.activeEditor.queryCommandValue('ToggleSidebar');`
    * Returns the current state of sidebar (open or closed).
* Help views for keyboard shortcuts and typed markdown-to-rich-text conversions?
* CSS styling colors with text selection in markdown editor need fixing (especially dark mode).
* Scroll sync doesn't work on startup if mouse cursor hasn't been moved yet (i.e., if scroll was done first).
* Do sync scroll based on line number?
* Transition artifacts when opening/closing markdown sidebar with adjust editor spacing.
* Markdown editor vertical scrollbar scrolls above the editing area in split-screen mode.
* Can currently only enter markdown editor split-screen mode via WYSIWYG editor full-page mode.
** Button and keyboard shortcuts don't work otherwise (i.e., if in markdown editor full-page mode).
* Non-EasyMDE markdown editor scrollbar should be on far right.
* Non-EasyMDE markdown editor scroll goes to end on launch.
* Padding 30px has made markdown editor border a little wonky... (e.g., with scroll). Needs fix.

## Editing

* p vs. br behavior... option...
  * How to mimic Notepad-style in WYSIWYG editor:
    * Set padding and margin for p, headers, other elements to 0.
    * Change HTML-to-markdown conversions for these elements from two linebreaks (`\n\n`) to one (`\n`).
    * Adjust line height (default 1.6, maybe change to 1.4).
    * Reduce empty line height if possible (?).
    * But causes problems with markdown conversion.
* Code blocks in rich-text mode need work.
* Live-typing markdown-to-rich-text conversion of link, image, multi-line code, others not added.
* Tabs are converted into `&emsp;` with open .txt file (otherwise tabs removed completely).
  * Maybe helpful: https://stackoverflow.com/questions/2237497/
* Code block autocomplete needs work... maybe helpful:
  * addAutocompleter() -> https://www.tiny.cloud/docs/api/tinymce.editor.ui/tinymce.editor.ui.registry/#addautocompleter
    * "When a configured string pattern is matched in the content while typing, the autocompleter will be triggered."
* Link active highlight bug in dark mode.
* Can't click to move caret in margins in markdown editor full-width mode.
* Local images don't display... possible to fix or remedy somehow?

## User Input

* More keyboard shortcuts?:
  * Ctrl+` -> Code
    * Doesn't work...
  * Ctrl+Shift+O -> Open folder (later?)
  * Ctrl+Shift+I for insert image conflicts with Developer Tools in Chrome (but does work in browser).
  * Ctrl+Shift+T for insert table conflicts with undo close tab (and doesn't work in browser).
* Need to work on keyboard shortcuts in markdown editor mode.
  * E.g., Ctrl+D causes line to be deleted instead of strikethrough (CodeMirror default).
* Add Alt + F keyboard shortcut to open File menu if possible.
* Use Chrome search for Ctrl+F? Disable TinyMCE shortcut?
  * Tried but couldn't remove/override TinyMCE's Ctrl+F.
* Disable Ctrl+R, dev tools, and other keyboard shortcuts?
  * Dev tools already disabled via insert image shorcut.
* Encounter this sometimes with quit: "Scripts may only close windows that were opened by them".
* Fullscreen button and/or keyboard shortcut doesn't work in non-app mode (sometimes?).

## HTML–Markdown Conversion

* Headers are added to headerless tables with Turndown so they aren't removed (although this doesn't always work/happen).
* Showdown can't handle headerless tables.
* Showdown escapes various things. Markdown characters (e.g., "~", "|", "0.5" -> 0.5). Happens even in URLs.
  * Showdown did this escape also:
    * `[alcohol](https://en.wikipedia.org/wiki/Alcohol_(drug))-like` -> `[alcohol](https://en.wikipedia.org/wiki/Alcohol_(drug))\-like`
* Turndown and/or Showdown remove extra lines at end of files. Same with markdown-to-HTML conversion (or maybe that's TinyMCE).
  * Update: Added two new lines after HTML-to-markdown conversion as a temp fix. Needs more work though. And need WYSIWYG mode fix.
* Both Turndown and Showdown don't parse this URL right: `Stege et al., 199628:5%3C307::AID-PROS6%3E3.0.CO;2-8` ->
  * `([Stege et al., 1996](https://doi.org/10.1002/(SICI)1097-0045(199605)28:5<307::AID-PROS6>3.0.CO;2-8)).`
    * Breaks after the second closing parenthesis -> "199605)28" (that parenthesis)
* Showdown HTML-to-markdown replaces markdown within HTML tags with HTML (changed `**` to `<em></em>` and `[]()` to `<a...`).
* Another JS HTML-to-markdown converter to look at (but node.js):
  * https://github.com/breakdance/breakdance
* Neither Turndown nor Showdown HTML-to-markdown handle Shift+Enter behavior right (`<br >`'s)... both just collapse the newlines.
* Turndown (but not Showdown) HTML-to-markdown is dropping extra line breaks.
  * But Showdown markdown-to-HTML is dropping extra line breaks...
* ``` `...` ``` pattern -> Converts to `<span><code></span></code>` in markdown with Turndown (but converts correctly with Showdown)
* ` ```...``` ` pattern -> Converts to `<pre></pre>` in markdown with Showdown (but converts correctly with Turndown)
* Turndown should drop empty links for headings with copy + paste HTML.

## File Handling

* No default filename with save file as.
  * Not possible to fix due to current Native File System limitations—not currently supported.
    * https://github.com/WICG/native-file-system/issues/80
* Open with doesn't allow use of file handle for subsequent save without prompt at this time. Need to fix.
* Can't automatically load last open file on start due to inability to store file handle. Possible to fix?

## Cut/Copy/Paste Behavior

* Change copy action to copy as HTML (remove the excess formatting and get the pure *intended* rich-text—not the displayed styling).
  * Special copy button/shortcut code wasn't working in some contexts so had to disable and revert back to original.
* Copy image in Chrome or copy HTML page contents including image -> converts into image URL instead of blob.
  * Should be applied to cut as well.
* Image blobs: copy image from paint -> paste + saving and opening files DOES WORK!

## Miscellaneous

* Decide on a name.
* Add app install/add to homescreen prompt stuff.
  * https://github.com/pwa-builder/pwa-install
  * https://love2dev.com/pwa/add-to-homescreen-library/
  * https://github.com/docluv/add-to-homescreen
* Add app update stuff?
  * https://github.com/pwa-builder/pwa-update
* Service worker and caching dependencies/etc.
  * https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/
* Dynamically load JavaScript dependencies (markdown–HTML engines) to load faster + save bandwidth:
  * https://www.kirupa.com/html5/loading_script_files_dynamically.htm
* Whatever else that's missing...

## Unsorted

* Markdown front matter fix works for default use case (MD, YAML) but need to test other use cases (e.g., HTML, TOML, etc.).
* Markdown front matter is hidden in WYSIWYG editing view. Make it display in a code block. TinyMCE might be finicky though...
* EasyMDE needs to ignore front matter in markdown (i.e., disable EasyMDE syntax-to-appearance parsing and transformation there).
* Write the undoPutFrontMatterInCodeBlock() function. Might be useful for supporting front matter display/editing in WYSIWYG mode.
* HTML-to-markdown with Turndown needs to ignore Liquid code... will break Liquid code if markdown parser happens to modify it.
  * Previously markdown-it autolink was breaking Liquid code in markdown but disabled autolink and this fixed that issue.

## New (2021/02/20)

* For tables, changes '| |' to '|  |' (maybe fine?)
* For tables, changes '|  Blah' to '| Blah' (maybe fine?)
* Converts markdown inside of HTML tags into HTML
* Changes '\<50 ng/dL' to '<50 ng/dL' (maybe fine?)
* Changes '10.1002/(SICI)1097-0045(199605)28:5<307::AID-PROS6>3.0.CO;2-8' to '10.1002/(SICI)1097-0045(199605)28:5%3C307::AID-PROS6%3E3.0.CO;2-8' (maybe fine? -> Update: Doesn't break links!)
* Changes '[mass spectrometry](https://en.wikipedia.org/wiki/Mass_spectrometry)-based' to '[mass spectrometry](https://en.wikipedia.org/wiki/Mass_spectrometry)\-based test' (maybe okay?)
* Removes trailing spaces from paragraphs (maybe fine)

* Bug (SHBG article): Changes '\n| --- |' to '| \--- '
  * When two tables in a row
* Converts HTML tables... (and breaks them badly)

* It's inserting a new line at top in markdown view?

* **Need to test editor on all site pages now**

* Seems to be breaking indented bullets... (try editing this bugs-and-to-do.md file to see).

## New (2021/02/28)

* Open directory + save file handles + permissions with re-launch: [https://web.dev/file-system-access/](https://web.dev/file-system-access/)

