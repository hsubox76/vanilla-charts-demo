(function nav() {
  const buttons = ['bars', 'lines', 'rocket'];
  const navContainer = document.getElementById("nav-container");

  buttons.forEach(button => {
    const buttonEl = document.createElement('a');
    buttonEl.href = button + '.html';
    buttonEl.textContent = button;
    navContainer.appendChild(buttonEl);
  });
})();