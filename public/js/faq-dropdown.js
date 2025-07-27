
// src/js/faq-dropdown.js

function initFaqDropdowns() {
  const cards = document.querySelectorAll('[data-toggle="faq"]');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const answer = card.querySelector('[data-target="faq"]');
      const icon = card.querySelector('span');

      if (!answer || !icon) return;

      answer.classList.toggle('hidden');
      icon.textContent = answer.classList.contains('hidden') ? '+' : '–';
    });
  });
}

initFaqDropdowns();
  