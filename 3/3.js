
const button    = document.getElementById("start-button");
const container = document.getElementById("rain-container");
const pageColor = document.getElementById("page-color");

const phrases   = [
  "You sound weird saying that.",
  "AWKWARD AWKWARD AWKWARD",
  "Why did you say that?",
  "Was that a mistake?",
  "Just stay quiet",
  "Not even funny",
  "They don't want to talk to you anymore",
  "Are you overthinking?"
];

button.addEventListener("click", () => {
  button.style.display = "none";
  startRain();


  // 1) After 20s: begin fading out all static UI
  setTimeout(() => {
    const staticEls = document.querySelectorAll(".canvas > :not(#rain-container)");
    staticEls.forEach(el => {
      el.style.transition = "opacity 14s ease";
      el.style.opacity    = "0";
    });

    // 2) 1s after static UI fade has started, fade out the overlay
    setTimeout(() => {
      pageColor.style.transition = "opacity 13s ease";
      pageColor.style.opacity    = "0";
    }, 5300);

  }, 7000);

   // 4) after 24 s, navigate to 4.html
   setTimeout(() => {
    window.location.href = "../4/4.html";
  }, 30000);
});

function startRain() {
  const startTime     = Date.now();
  let interval        = 1500;  // initial spawn gap
  const minInterval   = 20;    // fastest spawn = one every 20 ms
  const baseAccel     = 0.98;  // will slowly ramp acceleration factor down
  const accelDecay    = 0.0002;// how quickly accelFactor decays per ms

  function spawnAndRepeat() {
    // compute how long it’s been running (ms)
    const elapsed = Date.now() - startTime;

    // 1) spawn one thought
    const span = document.createElement("div");
    span.className   = "falling-text";
    span.textContent = phrases[
      Math.floor(Math.random() * phrases.length)
    ];
    span.style.left = Math.random() * 100 + "vw";

    // lengthen the fall duration the longer it’s been alive
    const baseDur = 3;        // base 3 s
    const extra   = elapsed / 8000; // +1 s every 5 s elapsed
    span.style.animationDuration = `${baseDur + extra}s`;

    container.appendChild(span);

    // 2) compute a decaying accelFactor so it speeds up more over time
    const accelFactor = Math.max(
      0.1,
      baseAccel - elapsed * accelDecay
    );
    // shrink the interval, but never below minInterval
    interval = Math.max(minInterval, interval * accelFactor);

    // schedule next
    setTimeout(spawnAndRepeat, interval);
  }

  spawnAndRepeat();
}
