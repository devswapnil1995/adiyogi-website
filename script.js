const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const dateInput = document.getElementById('travelDate');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
dateInput.min = localToday;

document.querySelectorAll('[data-destination]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('[name="destination"]').value = link.dataset.destination;
  });
});
document.querySelectorAll('[data-vehicle]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('[name="vehicle"]').value = button.dataset.vehicle;
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  });
});
document.querySelectorAll('[data-package]').forEach(link => {
  link.addEventListener('click', () => {
    const msg = document.querySelector('[name="message"]');
    msg.value = `I am interested in the ${link.dataset.package} package.`;
  });
});

document.getElementById('bookingForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const error = document.getElementById('formError');
  error.textContent = '';
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const fields = {
    name: data.get('name').trim(),
    phone: data.get('phone').trim(),
    destination: data.get('destination'),
    vehicle: data.get('vehicle') || 'Not decided yet',
    date: data.get('date') || 'Flexible',
    travellers: data.get('travellers') || 'Not specified',
    message: data.get('message').trim() || 'No additional details'
  };

  const message = [
    'Namaste Adiyogi Travels Solapur! I would like to enquire about a trip.',
    '',
    `Name: ${fields.name}`,
    `Contact number: ${fields.phone}`,
    `Destination: ${fields.destination}`,
    `Preferred vehicle: ${fields.vehicle}`,
    `Travel date: ${fields.date}`,
    `Travellers: ${fields.travellers}`,
    `Additional details: ${fields.message}`,
    '',
    'Please share availability and package pricing. Thank you!'
  ].join('\n');

  // Primary enquiry number: 9657469781. Alternate contact: 9130932671.
  const whatsappUrl = `https://wa.me/919130932671?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});
