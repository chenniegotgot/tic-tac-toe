import { BoardGame } from './board_game';
import { TicTacToe } from './tic_tac_toe';

// Start Game
const ticTacToe = new TicTacToe(new BoardGame());
ticTacToe.startGame();
