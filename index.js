let textArea = document.getElementById("text-area");
textArea.style.backgroundColor = "transparent";
textArea.style.color = "black";
let quoteDiv = document.getElementById("quote");
const timerElement = document.getElementById("timer");
let interval;

async function startApp() {
  await getQuote();
  textArea.addEventListener("input", checkType);
}

async function getQuote() {
  document.getElementById("successMessage").style.display = "none";
  document.getElementById("triggerButton").style.display = "none";
  const res = await fetch("https://api.quotable.io/random");
  const json = await res.json();
  quoteDiv.innerHTML = "";
  textArea.value = null;
  if (json.content) {
    console.log(json.content);
    for (let char of json.content) {
      let span = document.createElement("span");
      span.innerHTML = char;
      quoteDiv.appendChild(span);
    }
  }
  startTimer();
}

function checkType(e) {
  let values = e.target.value;
  let correct = true;
  document.querySelectorAll("span").forEach((charSpan, i) => {
    if (!values[i]) {
      charSpan.style.color = "black";
      correct = false;
    } else if (values[i] === document.querySelectorAll("span")[i].innerText) {
      charSpan.style.color = "#00e600";
    } else {
      charSpan.style.color = "red";
      correct = false;
    }
  });
  if (correct) {
    clearInterval(interval);
    document.getElementById("successMessage").style.display = "block";
    document.getElementById("triggerButton").style.display = "block";
  }
}

let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  interval = setInterval(() => {
    timer.innerText = Math.floor((new Date() - startTime) / 1000);
  }, 1000);
}

startApp();
