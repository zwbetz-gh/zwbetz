const dialog = document.querySelector('#debug_modal') as HTMLDialogElement;
const showButton = document.querySelector('#show_debug_modal') as HTMLButtonElement;
const closeButton = document.querySelector('#close_debug_modal') as HTMLButtonElement;

showButton.addEventListener('click', () => {
  dialog.showModal();
});

closeButton.addEventListener('click', () => {
  dialog.close();
});
