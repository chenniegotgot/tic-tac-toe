import { ScoreInterface } from './interfaces/score.interface';
import { BoardInterface } from './interfaces/board.interface';

export class BoardGame implements BoardInterface {
  /**
   * Bind document click to the game if clicked element is a cell
   * @param {requestCallback} clickHandler
   */
  bindHandler(clickHandler: (row: number, col: number) => void): void {
    document.addEventListener('click', (event: Event) => {
      const clicked = event.target as HTMLElement
      const isColumn = clicked.className === 'col';

      if (isColumn) {
        const cell = clicked;
        const row = +cell.parentElement!.dataset.row!;
        const col = +cell.dataset.col!;

        clickHandler(row, col);
      }
    })
  }

  /**
   * Create an element and apply an optional class and dataset
   * @param {string} tag
   * @param {string} className (Optional)
   * @param {Object[]} dataset (Optional)
   * @return {HTMLElement}
   */
  createElement = (tag: string, className?: string, dataset?: Array<any>): HTMLElement => {
    const element = document.createElement(tag);
    if (className)
      element.classList.add(className);

    if (dataset)
      element.dataset[dataset[0]] = dataset[1];

    return element;
  }

  /**
   * Retrieve an existing element in the DOM
   * @param {string} selector
   * @return {HTMLElement}
   */
  getElement = (selector: string): HTMLElement => document.querySelector(selector) as HTMLElement;

  /**
   * Retrieve all elements by selector from the DOM
   * @param {string} selector
   * @return {NodeList}
   */
  getAllElements = (selector: string): NodeList => document.querySelectorAll(selector) as NodeList;

  /**
   * Create the game board view and render it to the DOM
   * @param {Object[]} boardData 3x3 multi-dimensional array of empty strings
   */
  createGameBoard = (boardData: Array<Array<string>>): void => {
    const game = this.getElement('#game');
    const gameBoard = this.createElement('div', 'board', undefined);

    game.append(gameBoard);

    boardData.forEach((row, i) => {
      const boardRow = this.createElement('div', 'row', ['row', i]);
      gameBoard.append(boardRow);

      row.forEach((col, j) => {
        const boardCol = this.createElement('div', 'col', ['col', j]);
        boardRow.append(boardCol);
      });
    });

    const restart = this.createElement('button', 'restart', undefined);
    restart.innerHTML = 'Restart Game';

    game.append(restart);
  }

  /**
   * Update the board by appending a player to a cell
   * @param {number} row
   * @param {number} col
   * @param {string} currentPlayer
   */
  updateGameBoard = (row: number, col: number, currentPlayer: string): void => {
    const player = this.createElement('span', currentPlayer, undefined);
    player.textContent = currentPlayer;

    const boardRow = this.getElement(`[data-row="${row}"]`);
    const cell = boardRow.querySelector(`[data-col="${col}"]`) as HTMLElement;

    cell.append(player);
  }

  /**
   * Set all cells in the board to empty strings
   */
  clearGameBoard = (): void => {
    const cells = this.getAllElements('.col');

    cells.forEach(cell => {
      cell.textContent = '';
    })
  }

  /**
   * Create the score board view and render it
   * @param {Score} score
   */
  createScoreBoard = (score: ScoreInterface): void => {
    const game = this.getElement('#game');
    const scoreBoard = this.createElement('div', 'score');

    game.append(scoreBoard);

    const playerOneScore = this.createElement('div', 'score-x')
    playerOneScore.innerHTML = `Player 1: ${score.x}`
    playerOneScore.id = 'score-x'

    const playerTwoScore = this.createElement('div', 'score-o')
    playerTwoScore.innerHTML = `Player 2: ${score.o}`
    playerTwoScore.id = 'score-o'

    const drawCount = this.createElement('div', 'score-draw')
    drawCount.innerHTML = `Draw: ${score.draw}`
    drawCount.id = 'score-draw'

    scoreBoard.append(playerOneScore, playerTwoScore, drawCount)
  }

  /**
   * Update the existing score for the current player
   * @param {Score} currentScore
   * @param {string} currentPlayer
   */
  updateScore = (currentScore: ScoreInterface, currentPlayer: string): void => {
    const currentPlayerScore = this.getElement(`#score-${currentPlayer}`);
    let player = 'Draw';
    if (currentPlayer === 'x')
      player = 'Player 1';
    if (currentPlayer === 'o')
      player = 'Player 2';

    const score: number = currentScore[currentPlayer];
    currentPlayerScore.innerHTML = `${player}: ${score}`;
  }

  /**
   * Display the win, lose, or draw message
   * @param {string} winner
   */
  displayMessage = (winner: string): void => {
    const message = this.createElement('div', 'message');
    const player = winner === 'x' ? 'Player 1' : 'Player 2';

    message.textContent = winner ? `${player} wins!` : 'It\'s a draw!';

    const restart = this.getElement('#game');
    restart.append(message);
  }

  /**
   * Clear message
   */
  clearMessage = (): void => {
    const message = this.getElement('.message');

    if (message)
      message.remove();
  }

  /**
   * Clear score
   */
  clearScore = (): void => {
    const playerOneScore = this.getElement('.score-x');
    playerOneScore.innerHTML = 'Player 1: 0';

    const playerTwoScore = this.getElement('.score-o');
    playerTwoScore.innerHTML = 'Player 2: 0';

    const drawCount = this.getElement('.score-draw');
    drawCount.innerHTML = 'Draw: 0';
  }
}
