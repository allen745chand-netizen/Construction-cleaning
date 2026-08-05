// Navigation menu toggle logic
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menu) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open);
    menu.textContent = open ? 'Close' : 'Menu';
  });
}

// Quote forms logic
document.querySelectorAll('.quote-form').forEach((form) => {
  const hidden = form.querySelector('input[name="service"]');

  // Service tab toggling
  form.querySelectorAll('.service-tabs button').forEach((tab) => {
    tab.addEventListener('click', () => {
      form.querySelectorAll('.service-tabs button').forEach((button) => button.classList.remove('selected'));
      tab.classList.add('selected');
      if (hidden) hidden.value = tab.dataset.service;
    });
  });

  // Form submit handler
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // 1. Collect form data as object
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());

    // 2. Log data to browser console (ready for backend)
    console.log("New Quote Request Submitted:", dataObj);

    // 3. Display confirmation message
    const serviceName = hidden ? hidden.value.toLowerCase() : 'cleaning';
    const msgEl = form.querySelector('.form-message');
    if (msgEl) {
      msgEl.textContent = `Thanks — we received your ${serviceName} inquiry and will be in touch shortly.`;
    }

    // 4. Reset form
    form.reset();
  });
});

// Gallery carousel logic (arrows + edge fade)
const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid) {
  const viewport = galleryGrid.closest('.gallery-viewport');
  const prevBtn = viewport.querySelector('.gallery-arrow.prev');
  const nextBtn = viewport.querySelector('.gallery-arrow.next');

  const getStep = () => {
    const item = galleryGrid.querySelector('.gallery-item');
    if (!item) return galleryGrid.clientWidth;
    const gap = parseFloat(getComputedStyle(galleryGrid).columnGap) || 0;
    return item.getBoundingClientRect().width + gap;
  };

  const FADE = '48px';

  const updateEdgeMask = (atStart, atEnd) => {
    const stops = [];
    stops.push(atStart ? 'black 0%' : `transparent 0%, black ${FADE}`);
    stops.push(atEnd ? 'black 100%' : `black calc(100% - ${FADE}), transparent 100%`);
    const mask = `linear-gradient(to right, ${stops.join(', ')})`;
    galleryGrid.style.maskImage = mask;
    galleryGrid.style.webkitMaskImage = mask;
  };

  const updateArrows = () => {
    const maxScroll = galleryGrid.scrollWidth - galleryGrid.clientWidth;
    const atStart = galleryGrid.scrollLeft <= 4;
    const atEnd = galleryGrid.scrollLeft >= maxScroll - 4;
    prevBtn.disabled = atStart;
    nextBtn.disabled = atEnd;
    updateEdgeMask(atStart, atEnd);
  };

  prevBtn.addEventListener('click', () => {
    galleryGrid.scrollBy({ left: -getStep(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    galleryGrid.scrollBy({ left: getStep(), behavior: 'smooth' });
  });

  galleryGrid.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  updateArrows();
}

// Gallery lightbox logic
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('figcaption');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  const openLightbox = (item) => {
    const thumb = item.querySelector('img');
    lightboxImg.src = item.dataset.full || thumb.src;
    lightboxImg.alt = thumb.alt;
    lightboxCaption.textContent = item.dataset.caption || '';
    lightbox.hidden = false;
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImg.src = '';
  };

  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => openLightbox(item));
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
}

// Quote panel tab switching logic
document.querySelectorAll('.quote-type-tabs').forEach((tabs) => {
  tabs.querySelectorAll('button').forEach((tab) => {
    tab.addEventListener('click', () => {
      const container = tabs.parentElement;
      tabs.querySelectorAll('button').forEach((button) => button.classList.toggle('selected', button === tab));
      container.querySelectorAll('.quote-panel').forEach((panel) => panel.classList.toggle('selected', panel.dataset.panel === tab.dataset.quote));
    });
  });
});