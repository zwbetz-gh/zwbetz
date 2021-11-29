(function () {
  const PASSWORD = 'please';
  const DIV_BACKGROUND_COLOR = '#fcfcfc';
  const DIV_ID = 'draft_div';
  const INPUT_ID = 'draft_input';

  const createDiv = () => {
    const div = document.createElement('div');
    div.id = DIV_ID;
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.style.position = 'absolute';
    div.style.top = 0;
    div.style.left = 0;
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.backgroundColor = DIV_BACKGROUND_COLOR;
    return div;
  };

  const removeDiv = () => {
    const div = document.getElementById(DIV_ID);
    div.remove();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const inputPassword = document.getElementById(INPUT_ID).value;
    if (inputPassword === PASSWORD) {
      removeDiv();
    }
  };

  const createForm = () => {
    const form = document.createElement('form');
    form.addEventListener('submit', handleSubmit);
    return form;
  };

  const createInput = () => {
    const input = document.createElement('input');
    input.id = INPUT_ID;
    input.type = 'password';
    input.autocomplete = 'one-time-code';
    input.placeholder = 'Password';
    return input;
  };

  const main = () => {
    const div = createDiv();
    const form = createForm();
    const input = createInput();
    form.appendChild(input);
    div.appendChild(form);
    document.body.appendChild(div);
  };

  main();
})();
