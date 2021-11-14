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
    form.style.fontSize = '1rem';

    const filenameLabel = document.createElement('label');
    filenameLabel.style.display = 'block';
    filenameLabel.htmlFor = 'demo_filename';
    filenameLabel.textContent = 'Filename:';

    const filenameInput = document.createElement('input');
    filenameInput.style.display = 'block';
    filenameInput.id = 'demo_filename';
    filenameInput.type = 'text';
    filenameInput.value = 'demo.txt';

    const contentsLabel = document.createElement('label');
    contentsLabel.style.display = 'block';
    contentsLabel.htmlFor = 'demo_contents';
    contentsLabel.textContent = 'Contents:';

    const contentsInput = document.createElement('textarea');
    contentsInput.style.display = 'block';
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
    button.className = '';
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

    formEls.forEach(el => form.appendChild(el));
    document.getElementById('demo').appendChild(form);
  };

  setupDemo();
})();
