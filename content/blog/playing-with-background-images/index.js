(function () {
  function createDiv(className) {
    const div = document.createElement('div');
    div.className = className;
    div.textContent = className;
    return div;
  }

  const box = document.querySelector('#box');

  const base = createDiv('base');
  base.style.marginTop = '2rem';
  box.append(base);

  for (let i = 1; i <= 7; i++) {
    const div = createDiv(`base variant-${i}`);
    box.append(div);
  }
})();
