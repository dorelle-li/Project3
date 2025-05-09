// start.js
document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.addEventListener('click', () => {
    window.location.href = '1/1.html';
  });
});



const circle = document.getElementById('circleContainer');
const bubble = circle.querySelector('.bubble-speech');

circle.addEventListener('click', () => {
  bubble.classList.toggle('visible');
});
