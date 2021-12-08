const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let pop = 0;
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('Ah nah thats the same one bud');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  pop++;
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function showTimer(){
  timeSet = 11;
  var downloadTimer = setInterval(function(){
  timeSet--;
  document.getElementById("remainingTime").textContent = timeSet;    
  if(timeSet == 0){
      document.getElementById("remainingTime").textContent = "Dımız popped " + pop + " times, you hit "+ score +" times!";
      document.getElementById("remainingTime").onclick = function() { location.reload(); return false;  };
  }
  if(timeSet <= 0)
      clearInterval(downloadTimer);
  },1000);
  document.getElementById("start").remove();
  document.getElementById("time").style.visibility = "unset";

}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  showTimer();
  score = 0;
  peep();
  setTimeout(() =>  timeUp = true, 10000)
}

function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));