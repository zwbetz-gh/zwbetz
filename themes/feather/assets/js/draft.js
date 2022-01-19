(function () {
  const PASSWORD = 'admin';
  const DIV_BACKGROUND_COLOR = '#fcfcfc';
  const PARENT_DIV_ID = 'draft_parent_div';
  const INPUT_ID = 'draft_input';
  const SELECTORS_TO_TOGGLE = ['header', 'main', 'footer'];

  const showSelectors = () => {
    SELECTORS_TO_TOGGLE.forEach(selector => {
      const el = document.querySelector(selector);
      el.style.display = 'block';
    });
  };

  const hideSelectors = () => {
    SELECTORS_TO_TOGGLE.forEach(selector => {
      const el = document.querySelector(selector);
      el.style.display = 'none';
    });
  };

  const createParentDiv = () => {
    const div = document.createElement('div');
    div.id = PARENT_DIV_ID;
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.style.position = 'fixed';
    div.style.top = 0;
    div.style.left = 0;
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.backgroundColor = DIV_BACKGROUND_COLOR;
    return div;
  };

  const createChildDiv = () => {
    const div = document.createElement('div');
    div.style.padding = '2rem';
    div.style.borderWidth = '0.25rem';
    div.style.borderStyle = 'solid';
    div.style.backgroundColor = DIV_BACKGROUND_COLOR;
    return div;
  };

  const removeParentDiv = () => {
    const div = document.getElementById(PARENT_DIV_ID);
    div.remove();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const inputPassword = document.getElementById(INPUT_ID).value;
    if (inputPassword === PASSWORD) {
      showSelectors();
      removeParentDiv();
    }
  };

  const createForm = () => {
    const form = document.createElement('form');
    form.addEventListener('submit', handleSubmit);
    return form;
  };

  const createH1 = () => {
    const h1 = document.createElement('h1');
    h1.textContent = `DRAFT`;
    return h1;
  };

  const createLabel = () => {
    const label = document.createElement('label');
    label.htmlFor = INPUT_ID;
    label.innerHTML = `Type the password then hit <strong>Enter</strong> `;
    label.style.display = 'block';
    label.style.marginBottom = '1rem';
    return label;
  };

  const createInput = () => {
    const input = document.createElement('input');
    input.id = INPUT_ID;
    input.type = 'password';
    input.autocomplete = 'one-time-code';
    input.placeholder = 'Password';
    return input;
  };

  const render = () => {
    const parentDiv = createParentDiv();
    const childDiv = createChildDiv();
    const form = createForm();
    const h1 = createH1();
    const label = createLabel();
    const input = createInput();
    form.appendChild(h1);
    form.appendChild(label);
    form.appendChild(input);
    childDiv.appendChild(form);
    parentDiv.appendChild(childDiv);
    document.body.appendChild(parentDiv);
  };

  const focusInput = () => {
    const input = document.getElementById(INPUT_ID);
    input.focus();
  };

  const handleDomContentLoaded = () => {
    hideSelectors();
    render();
    focusInput();
  };

  const main = () => {
    window.addEventListener('DOMContentLoaded', handleDomContentLoaded);
  };

  main();
})();
