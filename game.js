const player = document.getElementById("player");
const quizModal = document.getElementById("quizModal");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const message = document.getElementById("message");
const scoreEl = document.getElementById("score");
const healthEl = document.getElementById("health");

let playerX = 20;
let score = 0;
let health = 3;
let gamePaused = false;
let questions = [];

fetch("questions.json")
.then(res => res.json())
.then(data => {
  questions = data;
});

function updatePlayer(){
  player.style.left = playerX + "px";
}

function moveLeft(){
  if(gamePaused) return;
  playerX -= 15;
  if(playerX < 0) playerX = 0;
  updatePlayer();
  checkQuestionCollision();
}

function moveRight(){
  if(gamePaused) return;
  playerX += 15;
  updatePlayer();
  checkQuestionCollision();
}

function checkQuestionCollision(){
  const boxes = document.querySelectorAll('.questionBox');

  boxes.forEach((box,index)=>{
    const boxX = parseInt(box.style.left);

    if(Math.abs(playerX - boxX) < 40 && box.style.display !== 'none'){
      openQuiz(index,box);
    }
  });
}

function openQuiz(index,box){
  gamePaused = true;

  const q = questions[index];

  questionText.innerText = q.question;
  optionsDiv.innerHTML = "";
  message.innerText = "";

  q.options.forEach(option=>{
    const btn = document.createElement("button");
updatePlayer();