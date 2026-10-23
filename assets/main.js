(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.nav-links');
  const closeMenu = () => {
    if (!menuToggle || !navigation) return;
    navigation.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
  };

  if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
      const open = navigation.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open);
    });
    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); });
  }

  const config = window.BASECHASIM_SITE || {};
  const email = typeof config.email === 'string' ? config.email.trim() : '';
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  document.querySelectorAll('[data-contact-email]').forEach(node => {
    if (!hasEmail) {
      node.removeAttribute('href');
      if (node.hasAttribute('data-show-email')) node.textContent = 'Contact email coming soon';
      return;
    }
    const subject = encodeURIComponent(config.subject || 'BASECHASIM product question');
    node.href = `mailto:${email}?subject=${subject}`;
    if (node.hasAttribute('data-show-email')) node.textContent = email;
  });

  document.querySelectorAll('[data-current-year]').forEach(node => {
    node.textContent = String(new Date().getFullYear());
  });
})();
