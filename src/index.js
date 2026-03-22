import Game from "./game.js";

var g_game = null;

let p1, p2;
while (!p1) {
  p1 = window.prompt("Who is player 1?");
}

while (!p2 && p1 !== p2) {
  p2 = window.prompt(
    p1 === p2 ? `Please enter a different name than ${p1}.` : "What is the name of player 2?"
  );
}

function printGameData() {
  console.log("In printGameData()")
  if(global.g_game) {
    console.log("g_game is NOT null");
    global.g_game.printData();
  }
  else {
    console.log("g_game is null");
  }
}

window.onload = () => {
  document.getElementById("p1Name").innerText = p1;
  document.getElementById("p2Name").innerText = p2;
  let score1 = 0;
  let score2 = 0;

  (function playGame(p1, p2) {
    document.getElementById("win").style.display = "none";
    document.getElementById("turn").style.display = "inline";
    document.getElementById("p1Score").innerText = score1;
    document.getElementById("p2Score").innerText = score2;

    global.g_game = new Game(p1, p2);
    const game = global.g_game;
    console.log("game was created");
    if(game) {
      console.log("game var is set");
    }
    const player = document.getElementById("player");
    player.innerText = game.player;

    document.querySelectorAll("#tictactoe td").forEach((el) => {
      el.innerText = "";
      el.onclick = (evt) => {
        el.onclick = undefined;
        evt.target.innerText = game.sym;
        evt.target.onclick = undefined;

        const [row, col] = evt.target.classList;
        window.showText("Click: Row " + row + ", Column " + col);
        console.log("Click: Row " + row + ", Column " + col);
        game.turn(row, col);

        if (game.hasWinner()) {
          document.getElementById("winner").innerText = game.player;
          document.getElementById("win").style.display = "inline";
          document.getElementById("turn").style.display = "none";

          if (game.player === p1) {
            document.getElementById("p1Score").innerText = ++score1;
          } else {
            document.getElementById("p2Score").innerText = ++score2;
          }

          document.getElementById("newGame").style.display = "inline";
          document.getElementById("newGame").onclick = () => playGame(p1, p2);

          document.querySelectorAll("td").forEach((el) => {
            el.onclick = undefined;
          });
        } else {
          game.nextPlayer();
          player.innerText = game.player;
        }
      };
    });
  })(p1, p2);
};
