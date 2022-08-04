const theToggle = document.querySelector('#the_toggle') as HTMLButtonElement;
const theText = document.querySelector('#the_text') as HTMLDivElement;

function handleClick() {
  if (theText.className === 'clamped_text') {
    theText.className = 'expanded_text';
  } else {
    theText.className = 'clamped_text';
  }
}

theToggle.addEventListener('click', handleClick);
