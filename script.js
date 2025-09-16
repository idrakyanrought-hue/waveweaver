const form = document.getElementById('contactForm');
const message = document.getElementById('formMessage');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (sessionStorage.getItem('formSubmitted')) {
    message.textContent = "You’ve already submitted this form. Thank you!";
    message.style.color = "orange";
  } else {
    sessionStorage.setItem('formSubmitted', 'true');
    message.textContent = "Thank you for reaching out! We’ll be in touch soon.";
    message.style.color = "lightgreen";
    form.reset();
  }
});