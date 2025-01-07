const secondHand = document.querySelector('.second-hand');

let clockStarted = false;

function setDate() {
  if(!secondHand) {
    console.error('No element with class "second-hand" found.');
    return;
  }
  const now = new Date();
  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90; // the add 90 offsets the 90 deg default for clock arm
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`
  console.log(seconds)
}

function startClock() {
  if (clockStarted) return; // disable multiple clockStarted being run
  clockStarted = true;
  setInterval(setDate, 1000);
  document.querySelector('#msg').textContent = "Clock Started!";
}

function stopClock() {
  if (!clockStarted) return;
  clockStarted = false;
  document.querySelector('#msg').textContent = "Clock Started!";
}

// scalable key-action mapping
const keyActions = {
  Enter: startClock,
  Escape: stopClock,
};


document.addEventListener('keydown', (event) => {
  const action = keyActions[event.key]; // Dynamic checking our object above
  if(action) action(); // modular call of the resulting key action
});
