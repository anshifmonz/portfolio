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
const success = document.querySelector('.fixed .success')
const fail = document.querySelector('.fixed .fail')

async function submitForm (e) {
  e.preventDefault();

  const formData = new FormData(form);
  let messageElement = '';

  try {
    const response = await fetch('https://formspree.io/f/xldejqva', {
      method: 'POST',
      body: formData,
      redirect: 'manual'
    });
    
    if (response.ok || response.type === 'opaqueredirect') {
      messageElement = success
      form.reset();
    } else {
      messageElement = fail
    }
  } catch (err) {
    console.error('Error:', err);
    messageElement = fail
  }

  messageElement.style.display = 'flex';
  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 5000);
}

form.addEventListener('submit', (e) => submitForm(e))