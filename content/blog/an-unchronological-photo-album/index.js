const filenames = ['beach_3.jpg', 'chicken.jpg', 'sleepy_1.jpg'];

const container = document.querySelector('#photos');

const html = [];

filenames.forEach((filename) => {
  const img = `<img src="img/${filename}">`;
  const br = '<br>';
  html.push(img);
  html.push(br);
  html.push(br);
});

container.innerHTML = html.join('\n');
