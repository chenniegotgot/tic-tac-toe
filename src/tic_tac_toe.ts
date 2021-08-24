import { PlayerInterface } from './interfaces/player.interface';
import { ScoreInterface } from './interfaces/score.interface';
import { BoardInterface } from './interfaces/board.interface';

export class TicTacToe {
  display: BoardInterface;
  board: Array<Array<string>>;
  players: PlayerInterface;
  waitingTime: number;
  isOngoing: boolean;
  scores: ScoreInterface;
  currentPlayer: string;

  constructor(display: BoardInterface) {
    this.display = display;
    this.board = this.createNewBoard();
    this.players = { x: 'x', o: 'o' };
    this.scores = { x: 0, o: 0, draw: 0 };
    this.waitingTime = 2000;
    this.isOngoing = true;
    this.currentPlayer = this.players.x;

    this.display.bindHandler(this.handleClickedCell);
  }

  /**
   * Click a cell in the game board and determine if it's a game over or switch player.
   */
  handleClickedCell = (row: number, col: number) => {
    // if cell is empty and the player is not waiting
    if (this.board[row][col] === '' && this.isOngoing) {
      // mark the cell with the current player
      this.board[row][col] = this.currentPlayer;
      this.display.updateGameBoard(row, col, this.currentPlayer);

      // check if the current player won the game
      const gameWon = this.checkWin(row, col);
      // check the empty rows
      const emptyRows  = this.board
        .map(r => r.filter(c => c === ''))
        .filter(r => r.length > 0);

      if (this.isOngoing) {
        if (gameWon) {
          this.increaseScore();
          this.display.updateScore(this.scores, this.currentPlayer);
          this.gameOver(this.currentPlayer);
        } else if (emptyRows.length < 1) {
          this.currentPlayer = 'draw';
          this.increaseScore();
          this.display.updateScore(this.scores, this.currentPlayer);
          this.gameOver();
        } else {
          this.switchPlayer();
        }
      }
    }
  }

  /**
   * Display message and reset board
   */
  gameOver = (winner?: string) => {
    this.isOngoing = false;
    this.display.displayMessage(winner);

    // reset board after displaying the message
    setTimeout(() => {
      this.currentPlayer = this.players.x;
      this.resetBoard();
      this.isOngoing = true;
    }, this.waitingTime)
  }

  /**
   * Reset board and clear score
   */
  restartGame = () => {
    this.scores = { x: 0, o: 0, draw: 0 };
    this.currentPlayer = this.players.x;
    this.display.clearScore();
    this.resetBoard();
  }

  /**
   * Create a new empty board
   * @return {Object[]} 3x3 multi-dimensional array of empty strings
   */
  createNewBoard = (): Array<Array<string>> => [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  /**
   * Restore the board to its original empty state
   */
  resetBoard = (): void => {
    this.display.clearMessage();
    this.display.clearGameBoard();
    this.board = this.createNewBoard();
  }

  /**
   * Check if the current player won the game
   * @param {number} row
   * @param {number} col
   * @return {boolean}
   */
  checkWin = (row: number, col: number): boolean => {
    if (
      // Horizontal winning condition
      (this.board[row][0] === this.currentPlayer &&
        this.board[row][1] === this.currentPlayer &&
        this.board[row][2] === this.currentPlayer) ||
      // Vertical winning condition
      (this.board[0][col] === this.currentPlayer &&
        this.board[1][col] === this.currentPlayer &&
        this.board[2][col] === this.currentPlayer) ||
      // Diagonal winning condition
      ((this.board[0][0] === this.currentPlayer &&
        this.board[1][1] === this.currentPlayer &&
        this.board[2][2] === this.currentPlayer) ||
        (this.board[2][0] === this.currentPlayer &&
          this.board[1][1] === this.currentPlayer &&
          this.board[0][2] === this.currentPlayer))
    )
      return true;

    return false;
  }

  /**
   * Switch to the next player
   */
  switchPlayer = (): void => {
    const { x, o } = this.players;
    this.currentPlayer = this.currentPlayer === x ? o : x;
  }

  /**
   * Increase the score of the winning player
   */
  increaseScore = (): void => {
    this.scores[this.currentPlayer] += 1;
  }

  /**
   * Render score and game board
   */
  startGame(): void {
    this.display.createScoreBoard(this.scores);
    this.display.createGameBoard(this.board);
    this.display.getElement('.restart').addEventListener('click', this.restartGame);
  }
}
