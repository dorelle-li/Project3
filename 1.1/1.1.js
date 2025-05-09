/// script.js

const inputBox = document.getElementById("intrusive-input");
const nextBtn  = document.getElementById("next-btn");

let typingTimer;
const doneTypingInterval = 2000; // ms after last keystroke

inputBox.addEventListener("input", () => {
  // Any new typing resets the timer and hides the button again
  clearTimeout(typingTimer);
  nextBtn.classList.add("hidden");

  // Once they pause typing…
  typingTimer = setTimeout(() => {
    inputBox.value = "Cool...";
    // Reveal SPEAK
    nextBtn.classList.remove("hidden");
  }, doneTypingInterval);
});

// Also clear pending replacement if they type quickly
inputBox.addEventListener("keydown", () => {
  clearTimeout(typingTimer);
});





// const inputBox = document.getElementById("intrusive-input");
// const nextBtn = document.getElementById("next-btn");

// const intrusiveThought = "You sound weird saying that.";
// let index = 0;

// inputBox.addEventListener("keydown", function (e) {
//   e.preventDefault();

//   if (index < intrusiveThought.length) {
//     inputBox.value += intrusiveThought[index];
//     index++;
//   }

//   // When the full sentence has been typed, show the button
//   if (index === intrusiveThought.length) {
//     nextBtn.classList.remove("hidden");
//   }
// });

