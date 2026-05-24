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

fetch("./questions.json")
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

  if(playerX < 0){
    playerX = 0;
  }

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

  const boxes = document.querySelectorAll(".questionBox");

  boxes.forEach((box,index)=>{

    const boxX = parseInt(box.style.left);

    if(Math.abs(playerX - boxX) < 40 && box.style.display !== "none"){

      openQuiz(index,box);

    }

  });

}

function openQuiz(index,box){

  gamePaused = true;

  const q = questions[index];

  if(!q){
    return;
  }

  questionText.innerText = q.question;

  optionsDiv.innerHTML = "";

  message.innerText = "";

  q.options.forEach(option=>{

    const btn = document.createElement("button");

    btn.className = "optionBtn";

    btn.innerText = option;

    btn.onclick = ()=>{

      if(option === q.answer){

        score += 10;

        scoreEl.innerText = score;

        message.innerText = "Correct Answer!";

        box.style.display = "none";

      }else{

        health--;

        healthEl.innerText = health;

        message.innerText = "Wrong Answer!";

      }

      if(health <= 0){

        setTimeout(()=>{

          alert("Game Over!");

          location.reload();

        },1000);

        return;

      }

      setTimeout(()=>{

        quizModal.style.display = "none";

        gamePaused = false;

        if(score === 30){

          alert("You Win!");

        }

      },1000);

    };

    optionsDiv.appendChild(btn);

  });

  quizModal.style.display = "flex";

}

window.addEventListener("keydown",(e)=>{

  if(e.key === "ArrowLeft"){

    moveLeft();

  }

  if(e.key === "ArrowRight"){

    moveRight();

  }

});

document.getElementById("leftBtn").addEventListener("click",moveLeft);

document.getElementById("rightBtn").addEventListener("click",moveRight);

updatePlayer();
