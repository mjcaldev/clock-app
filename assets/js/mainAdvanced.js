//implementing a stop/start function and mapping key commands to certain clock actions
// I also implemented some testing

const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

let clockStarted = false;
let clockInterval = null;

function setDate() {
  if (!secondHand || !minsHand || !hourHand) {
    console.error('One or more elements with class "second-hand", "min-hand", or "hour-hand" not found.');
    return;
  }

  const now = new Date();
  
  // Simulate fast-forwarding time for testing
  now.setSeconds(now.getSeconds() + 1); // Increment seconds
  now.setMinutes(now.getMinutes() + 1); // Increment minutes by 1 for testing
  
  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + 90;
  minsHand.style.transform = `rotate(${minsDegrees})`;

  const hour = now.getHours();
  const hourDegrees = ((hour % 12) / 12) * 360 + ((mins / 60) * 30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;

  console.log({ seconds, mins, hour });
}

function startClock() {
  if (clockStarted) return;
  clockStarted = true;
  clockInterval = setInterval(setDate, 1000);  // Normal clock speed (1 second interval)
  document.querySelector('#msg').textContent = "Clock Started! Press Esc to stop";
}

function stopClock() {
  if (!clockStarted) return;
  clearInterval(clockInterval);
  clockStarted = false;
  document.querySelector('#msg').textContent = "Clock Stopped!";
}

// Scalable key-action mapping
const keyActions = {
  Enter: startClock,
  Escape: stopClock,
  T: () => testClock(5), // Trigger the clock test on 'T' key press
};

document.addEventListener('keydown', (event) => {
  const action = keyActions[event.key];
  if (action) action();
});

// Testing for the clock (speed up to test the minute hand)

function testClock(speed = 1) {
  let count = 0;
  const interval = setInterval(() => {
    if (count === 60 * speed) {  // Stop after `speed` minutes (e.g., 5 minutes if speed is 5)
      clearInterval(interval);
      console.log('Test completed');
    } else {
      setDate(); // Call your setDate function to advance the time
      count++;
    }
  }, 100); // Faster tick rate (every 100ms)
}

 // Test with 5 times speed (skip 5 minutes for each second)