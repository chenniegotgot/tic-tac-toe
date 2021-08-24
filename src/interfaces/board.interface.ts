import { ScoreInterface } from './score.interface';

export interface BoardInterface {
  bindHandler(clickHandler: (row: number, col: number) => void): void;
  createElement(tag: string, className?: string, dataset?: Array<any>): HTMLElement;
  getElement(selector: string): HTMLElement;
  getAllElements(selector: string): NodeList;
  createGameBoard(boardData: Array<Array<string>>): void;
  createScoreBoard(score: ScoreInterface): void;
  updateGameBoard(row: number, col: number, currentPlayer: string): void;
  updateScore(currentScore: ScoreInterface, currentPlayer: string): void;
  displayMessage(winner?: string): void;
  clearGameBoard(): void;
  clearMessage(): void;
  clearScore(): void;
}
