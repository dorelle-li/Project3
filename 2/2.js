const negDiv = document.getElementById('negDiv');
const frame  = document.querySelector('.frame');

const runawayDiv = document.getElementById('runawayDiv');
const runawayP   = runawayDiv.querySelector('p');
const canvas = document.querySelector('.canvas');

let initialRect;
let hasAppended = false;

// 1) Capture its “home” position on load
window.addEventListener('DOMContentLoaded', () => {
  initialRect = runawayDiv.getBoundingClientRect();
});

runawayDiv.addEventListener('mouseenter', () => {
  const w  = runawayDiv.offsetWidth;
  const h  = runawayDiv.offsetHeight;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // 2) How far can we shift before it clips each edge?
  const minX = -initialRect.left;              
  const maxX =  vw - (initialRect.left + w);   
  const minY = -initialRect.top;               
  const maxY =  vh - (initialRect.top + h);    

  // 3) Pick a random offset in those safe bounds
  const randomX = Math.random() * (maxX - minX) + minX;
  const randomY = Math.random() * (maxY - minY) + minY;

  // 4) Apply movement
  runawayDiv.style.transform = `translate(${randomX}px, ${randomY}px)`;

  // 5) On first hover only, append “nobody cares”
  if (!hasAppended) {
    runawayP.innerHTML += ' <span class="nobody">nobody cares!!!</span>';
    hasAppended = true;
  }
});




const negMessages = [
  // note the offsets are percentages of the frame’s width/height
  {
    text:      'mind the tone',
    className: 'too-negative',
    offset:    { xPct: 0.60, yPct: 0.63 }
  },
  {
    text:      'too negative',
    className: 'stop-msg',
    offset:    { xPct: 0.32, yPct: 0.7 }
  },
  {
    text:      'BE HAPPIER',
    className: 'whatever-msg',
    offset:    { xPct: 0.53, yPct: 0.77 }
  }
];

let negClickCount = 0;

negDiv.addEventListener('click', () => {
  if (negClickCount >= negMessages.length) return;

  // pick your message
  const { text, className, offset } = negMessages[negClickCount];
  const msg = document.createElement('p');
  msg.textContent = text;
  msg.classList.add('frame-message', className);

  // absolutely position over the frame
  const frameRect = frame.getBoundingClientRect();
  const posX = frameRect.left + frameRect.width  * offset.xPct;
  const posY = frameRect.top  + frameRect.height * offset.yPct;

  msg.style.position = 'absolute';
  msg.style.left     = `${posX}px`;
  msg.style.top      = `${posY}px`;
  msg.style.zIndex   = '10';

  // append to canvas so it floats above everything
  canvas.appendChild(msg);

  negClickCount++;
});
