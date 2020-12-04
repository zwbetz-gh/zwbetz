(function () {
  const theToggle = document.querySelector('#the_toggle');
  const theText = document.querySelector('#the_text');

  function handleClick() {
    if (theText.className === 'clamped_text') {
      theText.className = 'expanded_text';
    } else {
      theText.className = 'clamped_text';
    }
  }

  theToggle.addEventListener('click', handleClick);
})();
