(function () {
  'use strict';

  // Nav: transparent at top, solid after 40px of scroll
  var nav = document.getElementById('menu');
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Gallery filter
  var buttons = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.gallery-item');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      var filter = btn.getAttribute('data-filter');
      items.forEach(function (item) {
        item.hidden = filter !== '*' && item.getAttribute('data-cat') !== filter;
      });
    });
  });

  // Footer year
  var year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
