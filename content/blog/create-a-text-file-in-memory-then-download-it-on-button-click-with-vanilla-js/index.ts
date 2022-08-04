/**
 * Download a file.
 *
 * @param filename The filename that the file will download as
 * @param contents The file contents
 * @param mimeType The MIME type
 */
const download = (
  filename: string,
  contents: string,
  mimeType = 'text/plain'
) => {
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
  const form = document.createElement('form') as HTMLFormElement;
  form.style.fontSize = '1rem';

  const filenameLabel = document.createElement('label') as HTMLLabelElement;
  filenameLabel.style.display = 'block';
  filenameLabel.htmlFor = 'demo_filename';
  filenameLabel.textContent = 'Filename:';

  const filenameInput = document.createElement('input') as HTMLInputElement;
  filenameInput.style.display = 'block';
  filenameInput.id = 'demo_filename';
  filenameInput.type = 'text';
  filenameInput.value = 'demo.txt';

  const contentsLabel = document.createElement('label') as HTMLLabelElement;
  contentsLabel.style.display = 'block';
  contentsLabel.htmlFor = 'demo_contents';
  contentsLabel.textContent = 'Contents:';

  const contentsInput = document.createElement(
    'textarea'
  ) as HTMLTextAreaElement;
  contentsInput.style.display = 'block';
  contentsInput.id = 'demo_contents';
  contentsInput.rows = 5;
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
  button.textContent = 'Download it!';
  button.type = 'button';
  button.onclick = handleClick;

  const formEls = [
    filenameLabel,
    filenameInput,
    contentsLabel,
    contentsInput,
    button
  ];

  for (const el of formEls) {
    form.appendChild(el);
  }

  const demo = document.querySelector('#demo') as HTMLDivElement;
  demo.appendChild(form);
};

setupDemo();
