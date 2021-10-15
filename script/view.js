import { Game } from "./controller.js";
export const choices = document.getElementById("choices");
const playButtonEl = document.getElementById("playButton");
const timerEl = document.getElementById("timer");
const hScoreEl = document.getElementById("HScore");
const bScoreEl = document.getElementById("BScore");
const resultEl = document.getElementById("result");
const bHandEl = document.getElementById("bHand")
const hHandEl= document.getElementById("hHand")

let game;

playButtonEl.addEventListener("click", () => {
  choices.classList.remove("remove")
  playButtonEl.classList.add("remove");
  timerEl.classList.remove("remove")
  game = new Game();
  handChange();
  hScoreEl.innerText = game.hScore;
  bScoreEl.innerText = game.bScore;
  game.onTimerChange = (timer) => {
    timerEl.innerHTML = timer;
  };
  game.onRound = (feedback) => {
    hScoreEl.innerText = game.hScore;
    bScoreEl.innerText = game.bScore;
    resultEl.innerText = feedback;
    resultEl.classList.remove("red", "green", "black", "remove")
    if (feedback == "(lost)") resultEl.classList.add("red");
    if (feedback == "(win)") resultEl.classList.add("green");
    if (feedback == "(draw)") resultEl.classList.add("black");
    resultEl.classList.remove("remove")
  };
  game.onFinish = () => {
    timer.classList.add("remove")
    playButtonEl.classList.remove("remove");
    resultEl.classList.add("remove");
    choices.classList.add("remove")
  };
});

choices.addEventListener("click", (e) => {
  if (e.target.localName == "div") {
    return;
  }
  game.botChooser();
  game.hChoice = game.getItemFromString(e.target.innerText);
  console.log(
    game.calculator( game.hChoice, game.bChoice)
  );
  const [hScore, bScore] = game.battleCheck();
  handChange()
  hScoreEl.innerText = hScore;
  bScoreEl.innerText = bScore;
});
function handChange() {
  bHandEl.src = `src/${game.bChoice || 2}.png`
  hHandEl.src = `src/${game.hChoice || 2}.png`
}