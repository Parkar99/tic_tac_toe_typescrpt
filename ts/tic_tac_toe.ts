enum Display {
  None,
  X,
  O
}

type Winner = Player | number;

class ButtonState {
  static NEW_GAME: number = 0;
  static END_GAME: number = 1;

  state: number;

  constructor() {
    this.state = ButtonState.NEW_GAME;
  }
}

class Player {
  playerName: string;
  constructor(playerName: string) {
    this.playerName = playerName;
  }
}

class Box {
  private _box: HTMLElement;
  private _boxState: Display;

  constructor(selector: string) {
    this._box = document.getElementById(selector)!;
    this._boxState = Display.None;

    this.display = this._boxState;
  }

  get display(): Display {
    return this._boxState;
  }

  set display(display: Display) {
    const svgs = this._box.getElementsByTagName("svg");

    for (var i = 0; i < svgs.length; i++) {
      svgs[i].style.display = "none";
    }

    if (display === Display.None) {
      return;
    }

    if (display === Display.X) {
      for (var i = 0; i < svgs.length; i++) {
        if (svgs[i].classList.contains("x")) {
          svgs[i].style.display = "inline-block";
        }
      }
    } else if (display === Display.O) {
      for (var i = 0; i < svgs.length; i++) {
        if (svgs[i].classList.contains("o")) {
          svgs[i].style.display = "inline-block";
        }
      }
    }

    this._boxState = display;
  }
}

class Board {
  private _board: Box[];
  private _winner: number;

  private static row1: [number, number, number] = [0, 1, 2];
  private static row2: [number, number, number] = [3, 4, 5];
  private static row3: [number, number, number] = [6, 7, 8];

  private static col1: [number, number, number] = [0, 3, 6];
  private static col2: [number, number, number] = [1, 4, 7];
  private static col3: [number, number, number] = [2, 5, 8];

  private static dig1: [number, number, number] = [0, 4, 8];
  private static dig2: [number, number, number] = [2, 4, 6];

  player1: Player;
  player2: Player;
  winLine: [number, number, number] | null;

  constructor(player1Name: string, player2Name: string) {
    this._board = [];
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this._winner = 0;
    this.winLine = null;

    for (var i = 0; i < 9; i++) {
      this._board[i] = new Box(`box${i + 1}`);
    }
  }

  getBoxStatus(boxNumber: number) {
    if (boxNumber < 0 || boxNumber > 8) {
      throw new Error("Box Number out of range");
    }

    return this._board[boxNumber].display;
  }

  setBoxStatus(boxNumber: number, player: Player) {
    if (boxNumber < 0 || boxNumber > 8) {
      throw new Error("Box Number out of range");
    }

    switch (player) {
      case this.player1:
        this._board[boxNumber].display = Display.X;
        break;

      case this.player2:
        this._board[boxNumber].display = Display.O;
        break;

      default:
        throw new Error("Invalid Player");
    }
  }

  private checkThree(
    boxNumber0: number,
    boxNumber1: number,
    boxNumber2: number
  ): Winner {
    if (
      this._board[boxNumber0].display === Display.X &&
      this._board[boxNumber1].display === Display.X &&
      this._board[boxNumber2].display === Display.X
    ) {
      return 1;
    }

    if (
      this._board[boxNumber0].display === Display.O &&
      this._board[boxNumber1].display === Display.O &&
      this._board[boxNumber2].display === Display.O
    ) {
      return 2;
    }

    return 0;
  }

  get winner(): Winner {
    if (this.checkThree(...Board.row1)) {
      let ct = this.checkThree(...Board.row1);

      switch (ct) {
        case this.player1:
          this._winner = 1;
          break;

        case this.player2:
          this._winner = 2;
          break;

        default:
          this._winner = 0;
      }

      this.winLine = Board.row1;
      return ct;
    }

    if (this.checkThree(...Board.row2)) {
      let ct = this.checkThree(...Board.row2);

      switch (ct) {
        case this.player1:
          this._winner = 1;
          break;

        case this.player2:
          this._winner = 2;
          break;

        default:
          this._winner = 0;
      }

      this.winLine = Board.row2;
      return ct;
    }

    if (this.checkThree(...Board.row3)) {
      let ct = this.checkThree(...Board.row3);

      switch (ct) {
        case this.player1:
          this._winner = 1;
          break;

        case this.player2:
          this._winner = 2;
          break;

        default:
          this._winner = 0;
      }

      this.winLine = Board.row3;
      return ct;
    }

    if (this.checkThree(...Board.col1)) {
      let ct = this.checkThree(...Board.col1);

      switch (ct) {
        case this.player1:
          this._winner = 1;
          break;

        case this.player2:
          this._winner = 2;
          break;

        default:
          this._winner = 0;
      }

      this.winLine = Board.col1;
      return ct;
    }

    if (this.checkThree(...Board.col2)) {
      let ct = this.checkThree(...Board.col2);

      switch (ct) {
        case this.player1:
          this._winner = 1;
          break;

        case this.player2:
          this._winner = 2;
          break;

        default:
          this._winner = 0;
      }

      this.winLine = Board.col2;
      return ct;
    }

    if (this.checkThree(...Board.col3)) {
      let ct = this.checkThree(...Board.col3);

      switch (ct) {
        case this.player1:
          this._winner = 1;
          break;

        case this.player2:
          this._winner = 2;
          break;

        default:
          this._winner = 0;
      }

      this.winLine = Board.col3;
      return ct;
    }

    if (this.checkThree(...Board.dig1)) {
      let ct = this.checkThree(...Board.dig1);

      switch (ct) {
        case this.player1:
          this._winner = 1;
          break;

        case this.player2:
          this._winner = 2;
          break;

        default:
          this._winner = 0;
      }

      this.winLine = Board.dig1;
      return ct;
    }

    if (this.checkThree(...Board.dig2)) {
      let ct = this.checkThree(...Board.dig2);

      switch (ct) {
        case this.player1:
          this._winner = 1;
          break;

        case this.player2:
          this._winner = 2;
          break;

        default:
          this._winner = 0;
      }

      this.winLine = Board.dig2;
      return ct;
    }

    let count = 0;
    this._board.forEach(box => {
      if (box.display !== Display.None) count++;
    });

    if (count >= 9) {
      return 3;
    }

    this.winLine = null;
    return 0;
  }
}

export { Board, ButtonState, Player, Display };
