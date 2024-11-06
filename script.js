// nav
const menuIcon = document.querySelector('nav .menu');
const closeIcon = document.querySelector('nav .drop-down .close');
const dropDownLinks = document.querySelectorAll('nav .drop-down div a');
const menu = document.querySelector('nav .drop-down');
const overlay = document.getElementById('overlay');

function toggleMenu() {
  menu.classList.toggle('active');
  closeIcon.classList.toggle('active');
  overlay.classList.toggle('active');
}

menuIcon.addEventListener('click', toggleMenu);
closeIcon.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
dropDownLinks.forEach(link => link.addEventListener('click', toggleMenu));

// faq
function toggleAnswer(button) {
  const answer = button.nextElementSibling;  
  answer.classList.toggle('visible');
}
const questions = document.querySelectorAll('section.faq .item > p');
questions.forEach(ele => ele.addEventListener('click', () => toggleAnswer(ele)));

// contact form
const form = document.querySelector('#contact form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);  

  try {
    const response = await fetch('https://formspree.io/f/mgveagne', {
      method: 'POST',
      body: formData,
      redirect: 'manual'
    });
    
    if (response.ok || response.type === 'opaqueredirect') {
      alert('Message sent successfully!');
      form.reset();
      return
    }
    alert('There was an error sending your message. Please try again.');
  } catch (err) {
    console.error('Error:', err);
    alert('There was an error sending your message. Please try again.');
  }
})