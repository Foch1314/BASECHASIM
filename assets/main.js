(() => {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  const closeMenu = () => {
    if (!links || !toggle) return;
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    });
    links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); });
  }

  const cfg = window.BASECHASIM_SITE || {};
  const safeEmail = typeof cfg.email === 'string' ? cfg.email.trim() : '';
  const goodEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail);
  document.querySelectorAll('[data-contact-email]').forEach(node => {
    const subject = encodeURIComponent(cfg.subject || 'BASECHASIM inquiry');
    if (goodEmail) {
      node.href = `mailto:${safeEmail}?subject=${subject}`;
      if (node.hasAttribute('data-show-email')) node.textContent = safeEmail;
    } else {
      node.removeAttribute('href');
      if (node.hasAttribute('data-show-email')) node.textContent = 'Please configure a contact email';
    }
  });
  document.querySelectorAll('[data-current-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });

  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-product-category]');
  filters.forEach(button => {
    button.addEventListener('click', () => {
      const current = button.getAttribute('data-filter');
      filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      cards.forEach(card => {
        card.hidden = !(current === 'all' || card.getAttribute('data-product-category') === current);
      });
      const count = [...cards].filter(card => !card.hidden).length;
      const live = document.getElementById('filter-status');
      if (live) live.textContent = `${count} product categories shown`;
    });
  });
})();
