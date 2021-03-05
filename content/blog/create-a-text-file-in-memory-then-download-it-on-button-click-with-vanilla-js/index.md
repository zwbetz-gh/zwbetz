---
title: "Create a Text File in Memory Then Download It on Button Click With Vanilla JS"
date: 2021-03-04T23:27:02-06:00
toc: false
---

## Code

HTML:

```html
<div id="demo"></div>
<script src="index.js"></script>
```

JS:

```js
(function () {
  /**
   * Download a file.
   *
   * @param filename The filename that the file will download as
   * @param contents The file contents
   * @param mimeType The MIME type
   */
  const download = (filename, contents, mimeType = 'text/plain') => {
    const blob = new Blob([contents], {type: mimeType});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const setupDemo = () => {
    const form = document.createElement('form');
    form.className = 'usa-form';

    const filenameLabel = document.createElement('label');
    filenameLabel.className = 'usa-label';
    filenameLabel.htmlFor = 'demo_filename';
    filenameLabel.textContent = 'Filename:';

    const filenameInput = document.createElement('input');
    filenameInput.className = 'usa-input';
    filenameInput.id = 'demo_filename';
    filenameInput.type = 'text';
    filenameInput.value = 'demo.txt';

    const contentsLabel = document.createElement('label');
    contentsLabel.className = 'usa-label';
    contentsLabel.htmlFor = 'demo_contents';
    contentsLabel.textContent = 'Contents:';

    const contentsInput = document.createElement('textarea');
    contentsInput.className = 'usa-textarea';
    contentsInput.id = 'demo_contents';
    contentsInput.value = [
      'The quick brown fox jumps over the lazy dog.',
      'Line 2.',
      'Line 3.'
    ].join('\n');

    const handleClick = () => {
      const filename = filenameInput.value;
      const contents = contentsInput.value;
      download(filename, contents);
    };

    const button = document.createElement('button');
    button.className = 'usa-button';
    button.id = 'demo_button';
    button.textContent = 'Download';
    button.type = 'button';
    button.onclick = handleClick;

    const formEls = [
      filenameLabel,
      filenameInput,
      contentsLabel,
      contentsInput,
      button
    ];

    formEls.forEach((el) => form.appendChild(el));
    document.getElementById('demo').appendChild(form);
  };

  setupDemo();
})();
```

## Demo

<div id="demo"></div>
<script src="index.js"></script>

## Reference

- The `Blob` object. [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
- Common MIME types. [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
- The `download` attribute of the `a` element. [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attributes)
- The `URL.createObjectURL()` function. [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
- The `URL.revokeObjectURL()` function. [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL)
