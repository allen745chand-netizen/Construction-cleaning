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