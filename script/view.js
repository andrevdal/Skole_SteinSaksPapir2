import { Game } from "./controller.js";
export const choices = document.getElementById("choices");
const playButton = document.getElementById("playButton");
const timerEl = document.getElementById("timer");
const hScoreEl = document.getElementById("HScore");
const bScoreEl = document.getElementById("BScore");
const resultEl = document.getElementById("result");

let game;

playButton.addEventListener("click", () => {
    game = new Game();
    game.onTimerChange = (timer) => {
        timerEl.innerHTML = timer;
    }
    game.onRound = (feedback) => {
        resultEl.innerText = feedback;
        resultEl.classList.remove("red", "green", "black");
        if (feedback == "lost") resultEl.classList.add("red");
        if (feedback == "win") resultEl.classList.add("green");
        if (feedback == "draw") resultEl.classList.add("black");
    }
    hScoreEl.innerText = game.hScore;
    bScoreEl.innerText = game.bScore;
})

choices.addEventListener("click", (e) => {
    if (e.target.localName == "div") {
        return
    }
    game.botChooser();
    game.hChoice = e.target.innerText;
    console.log(game.calculator(game.bChoice, game.getItemFromString(game.hChoice)));
    
    const [hScore, bScore] = game.battleCheck();

    hScoreEl.innerText = hScore;
    bScoreEl.innerText = bScore;

})
