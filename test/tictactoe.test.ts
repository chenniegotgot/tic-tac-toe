import { BoardGame } from '../src/board_game';
import { TicTacToe } from '../src/tic_tac_toe';

const assert = require('assert');

describe('TicTacToe', () => {
  beforeEach(function () {
    this.jsdom = require('jsdom-global')();
  });

  it('should create an empty board game', async () => {
    try {
      const board = new BoardGame();
      const tictactoe = new TicTacToe(board);
      const newBoard = tictactoe.createNewBoard();

      assert.ok(Array.isArray(newBoard));
    } catch (err) {
      assert.fail(err.message);
    }
  });

  it('should check if the current player won the game', async () => {
    try {
      const board = new BoardGame();
      const tictactoe = new TicTacToe(board);
      tictactoe.currentPlayer = tictactoe.players.x;
      tictactoe.board  = [
        ['x', 'x', 'x'],
        ['', 'o', 'o'],
        ['', '', '']
      ];

      const gameWon = tictactoe.checkWin(0, 1);
      assert.equal(tictactoe.currentPlayer, 'x');
      assert.equal(gameWon, true);
    } catch (err) {
      assert.fail(err.message);
    }
  });

  it('should switch to next player', async () => {
    try {
      const board = new BoardGame();
      const tictactoe = new TicTacToe(board);
      tictactoe.currentPlayer = tictactoe.players.x;
      tictactoe.isOngoing = true;
      tictactoe.board  = [
        ['x', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      tictactoe.switchPlayer();

      assert.equal(tictactoe.currentPlayer, 'o');
    } catch (err) {
      assert.fail(err.message);
    }
  });
});
