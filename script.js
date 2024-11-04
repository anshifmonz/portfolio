const question = document.querySelectorAll('section.faq .item > p');
question.forEach(ele => ele.addEventListener(e => toggleAnswer(e)))

function toggleAnswer(button) {
  const answer = button.nextElementSibling;
  if (answer.style.display === "block") return answer.style.display = "none";
  answer.style.display = "block";
}
