DJØFsk til Dansk
================
![Screenshot][]

[Only Danish part of the README:] “Omprioritering”, “budgetforbedring”,“effektivisering”, “normalisering”, “oprydning”, “servicetjek”, “spareøvelse”, “eftersyn”. Der er mange sjove måder at sige **“nedskæring”** på.

Denne Chrome-udvidelse kalder en spade for en spade, så der ikke går noget tabt for dem, som ikke taler flydende DJØFsk.

I første omgang omfatter projektet kun synonymer for nedskæring, men det kan være, projektets ambitioner vokser i takt med ordflommen.

Installation
------------
[Download from Chrome Web Store][download]

or

> To load your extension in Chrome, open up `chrome://extensions/` in your browser and click “Developer mode” in the top right. Now click “Load unpacked extension…” and select the extension’s directory (`src/`, nd). You should now see your extension in the list.
>
> When you change or add code in your extension, just come back to this page and reload the page. Chrome will reload your extension.

~ <https://robots.thoughtbot.com/how-to-make-a-chrome-extension>

or

You can also just drag and drop the [`.crx`][crx] file to your extensions page.

Thanks
------
This extension would not be possible without:

* [“How-to: Make your own text-replacing Chrome extension like ‘Millennials to Snake People’”][9to5]
* [Eric Bailey’s “Millennials to Snake People” (for Chrome)][snake-chrome]

Uh, what’s up with the permissions this extension needs?
--------------------------------------------------------
“Read and change all your data on the websites you visit” sounds super, super ominous, but this reflects that:

* The extension ”reads“ the page to look for words to replace.
* It only applies to `.dk` domains, which isn’t reflected in the prompt.

If you inspect `manifest.json`, you can see which websites the extension reads in this [section][permissions]:

```js
"content_scripts": [
  {
    "matches": [
      "http://*.dk/*",
      "https://*.dk/*"
    ],
    "js": ["content.js"],
    "run_at": "document_end"
  }
],
"permissions": [
  "http://*.dk/*",
  "https://*.dk/*"
]
```

All the code is available here, so you

License
-------
[Do whatever][license]. The majority of the code for this project is from “Millennials to Snake People”, so who am I to tell you what to do with the source code.


[screenshot]: https://github.com/ndarville/djoefsk-til-dansk/blob/master/screenshot.png
[download]: https://chrome.google.com/webstore/detail/dj%C3%B8fsk-til-dansk/pojogepbaiiloieahegjkdidnihjeaph?authuser=1
[crx]: https://github.com/ndarville/djoefsk-til-dansk/blob/master/djoefsk-til-dansk.crx
[9to5]: http://9to5google.com/2015/06/14/how-to-make-a-chrome-extensions/amp/
[snake-chrome]: https://github.com/ericwbailey/millennials-to-snake-people
[permissions]: https://github.com/ndarville/djoefsk-til-dansk/blob/master/src/manifest.json#L16-L29
[license]: https://github.com/ndarville/djoefsk-til-dansk/blob/master/LICENSE.md
