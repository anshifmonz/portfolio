// faq
const question = document.querySelectorAll('section.faq .item > p');
question.forEach(ele => ele.addEventListener('click', e => toggleAnswer(e)))

function toggleAnswer(button) {
  const answer = button.nextElementSibling;
  if (answer.style.display === 'block') return answer.style.display = 'none';
  answer.style.display = 'block';
}

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