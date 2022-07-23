const PASSWORD = 'admin';
const DIV_BACKGROUND_COLOR = '#fcfcfc';
const PARENT_DIV_ID = 'draft_parent_div';
const INPUT_ID = 'draft_input';
const SELECTORS_TO_TOGGLE = ['header', 'main', 'footer'];

const showSelectors = (): void => {
  SELECTORS_TO_TOGGLE.forEach(selector => {
    const el = document.querySelector(selector) as HTMLElement;
    el.style.display = 'block';
  });
};

const hideSelectors = (): void => {
  SELECTORS_TO_TOGGLE.forEach(selector => {
    const el = document.querySelector(selector) as HTMLElement;
    el.style.display = 'none';
  });
};

const createParentDiv = (): HTMLDivElement => {
  const div = document.createElement('div');
  div.id = PARENT_DIV_ID;
  div.style.display = 'flex';
  div.style.justifyContent = 'center';
  div.style.alignItems = 'center';
  div.style.position = 'fixed';
  div.style.top = '0';
  div.style.left = '0';
  div.style.width = '100%';
  div.style.height = '100%';
  div.style.backgroundColor = DIV_BACKGROUND_COLOR;
  return div;
};

const createChildDiv = (): HTMLDivElement => {
  const div = document.createElement('div');
  div.style.padding = '2rem';
  div.style.borderWidth = '0.25rem';
  div.style.borderStyle = 'solid';
  div.style.backgroundColor = DIV_BACKGROUND_COLOR;
  return div;
};

const removeParentDiv = (): void => {
  const div = document.getElementById(PARENT_DIV_ID) as HTMLDivElement;
  div.remove();
};

const getInputEl = () => {
  return document.getElementById(INPUT_ID) as HTMLInputElement;
};

const handleSubmit = (event: SubmitEvent): void => {
  event.preventDefault();
  if (getInputEl().value === PASSWORD) {
    showSelectors();
    removeParentDiv();
  }
};

const createForm = (): HTMLFormElement => {
  const form = document.createElement('form');
  form.addEventListener('submit', handleSubmit);
  return form;
};

const createH1 = (): HTMLHeadingElement => {
  const h1 = document.createElement('h1');
  h1.textContent = `DRAFT`;
  return h1;
};

const createLabel = (): HTMLLabelElement => {
  const label = document.createElement('label');
  label.htmlFor = INPUT_ID;
  label.innerHTML = `Type the password then hit <strong>Enter</strong> `;
  label.style.display = 'block';
  label.style.marginBottom = '1rem';
  return label;
};

const createInput = (): HTMLInputElement => {
  const input = document.createElement('input');
  input.id = INPUT_ID;
  input.type = 'password';
  input.autocomplete = 'one-time-code';
  input.placeholder = 'Password';
  return input;
};

const render = (): void => {
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

const focusInput = (): void => {
  getInputEl().focus();
};

const handleDomContentLoaded = (): void => {
  hideSelectors();
  render();
  focusInput();
};

const main = (): void => {
  window.addEventListener('DOMContentLoaded', handleDomContentLoaded);
};

main();
