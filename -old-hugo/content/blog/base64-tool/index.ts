const getErrorEl = () => {
  return document.getElementById('error') as HTMLDivElement;
};

const getInputEl = () => {
  return document.getElementById('input') as HTMLInputElement;
};

const getActionEl = () => {
  return document.getElementById('action') as HTMLSelectElement;
};

const getOutputEl = () => {
  return document.getElementById('output') as HTMLTextAreaElement;
};

const getFormEl = () => {
  return document.getElementById('form') as HTMLFormElement;
};

const hideError = () => {
  getErrorEl().textContent = '';
  getErrorEl().style.display = 'none';
};

const showError = (error: any) => {
  getErrorEl().textContent = String(error);
  getErrorEl().style.display = 'block';
};

const parseInput = () => {
  const inputVal = getInputEl().value.trim();
  const actionVal = getActionEl().value;
  if (actionVal == 'encode') {
    return btoa(inputVal);
  }
  return atob(inputVal);
};

const createOutput = () => {
  hideError();
  let output = '';
  try {
    output = parseInput();
  } catch (error) {
    showError(error);
  }
  return output;
};

const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  getOutputEl().value = createOutput();
};

const main = () => {
  getFormEl().addEventListener('submit', handleSubmit);
};

main();
