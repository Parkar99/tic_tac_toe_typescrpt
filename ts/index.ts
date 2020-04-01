import { Board, ButtonState, Display, Player } from "./tic_tac_toe.js";

const ids = [
  "box1",
  "box2",
  "box3",
  "box4",
  "box5",
  "box6",
  "box7",
  "box8",
  "box9"
];

type PlayerObject = {
  name: string;
  player: Player;
};

let player1: PlayerObject = {
  name: "Player1",
  player: new Player("temp")
};
let player2: PlayerObject = {
  name: "Player2",
  player: new Player("temp")
};
let turn: PlayerObject;

const title = document.querySelector("header h1")! as HTMLHeadingElement;

let board = new Board(player1.name, player2.name);
const button = document.getElementById("btn")!;
let buttonState = new ButtonState();

player1.player = board.player1;
player2.player = board.player2;

ids.forEach((id, index) => {
  let box = document.getElementById(id)!;

  box.addEventListener("click", () => {
    if (buttonState.state === ButtonState.NEW_GAME) return;
    if (board.winner) return;

    const display = board.getBoxStatus(index);

    if (display === Display.None) {
      board.setBoxStatus(index, turn.player);

      if (board.winner === 1) {
        title.textContent = `${turn.name} Wins`;
      } else if (board.winner === 2) {
        title.textContent = `${turn.name} Wins`;
      } else if (board.winner === 3) {
        title.textContent = `DRAW`;
      } else {
        if (turn === player1) {
          turn = player2;
        } else {
          turn = player1;
        }

        title.textContent = `${turn.name}'s Turn`;
      }
    }
  });
});

button.addEventListener("click", () => {
  if (buttonState.state === ButtonState.NEW_GAME) {
    buttonState.state = ButtonState.END_GAME;

    turn = player1;

    title.textContent = `${turn.name}'s Turn`;
    button.textContent = "End Game";
  } else if (buttonState.state === ButtonState.END_GAME) {
    buttonState.state = ButtonState.NEW_GAME;

    board = new Board(player1.name, player2.name);
    player1.player = board.player1;
    player2.player = board.player2;
    title.textContent = `Tic Tac Toe`;

    button.textContent = "Start New Game";
  }
});
