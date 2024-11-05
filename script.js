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