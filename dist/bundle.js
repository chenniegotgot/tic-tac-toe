/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/boardgame.ts":
/*!**************************!*\
  !*** ./src/boardgame.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.BoardGame = void 0;\r\nclass BoardGame {\r\n    constructor() {\r\n        this.createElement = (tag, className, dataset) => {\r\n            const element = document.createElement(tag);\r\n            if (className)\r\n                element.classList.add(className);\r\n            if (dataset)\r\n                element.dataset[dataset[0]] = dataset[1];\r\n            return element;\r\n        };\r\n        this.getElement = (selector) => document.querySelector(selector);\r\n        this.getAllElements = (selector) => document.querySelectorAll(selector);\r\n        this.createGameBoard = (boardData) => {\r\n            const game = this.getElement('#game');\r\n            const gameBoard = this.createElement('div', 'board', undefined);\r\n            game.append(gameBoard);\r\n            boardData.forEach((row, i) => {\r\n                const boardRow = this.createElement('div', 'row', ['row', i]);\r\n                gameBoard.append(boardRow);\r\n                row.forEach((col, j) => {\r\n                    const boardCol = this.createElement('div', 'col', ['col', j]);\r\n                    boardRow.append(boardCol);\r\n                });\r\n            });\r\n            const restart = this.createElement('button', 'restart', undefined);\r\n            restart.innerHTML = 'Restart Game';\r\n            game.append(restart);\r\n        };\r\n        this.updateGameBoard = (row, col, currentPlayer) => {\r\n            const player = this.createElement('span', currentPlayer, undefined);\r\n            player.textContent = currentPlayer;\r\n            const boardRow = this.getElement(`[data-row=\"${row}\"]`);\r\n            const cell = boardRow.querySelector(`[data-col=\"${col}\"]`);\r\n            cell.append(player);\r\n        };\r\n        this.clearGameBoard = () => {\r\n            const cells = this.getAllElements('.col');\r\n            cells.forEach(cell => {\r\n                cell.textContent = '';\r\n            });\r\n        };\r\n        this.createScoreBoard = (score) => {\r\n            const game = this.getElement('#game');\r\n            const scoreBoard = this.createElement('div', 'score');\r\n            game.append(scoreBoard);\r\n            const playerOneScore = this.createElement('div', 'score-x');\r\n            playerOneScore.innerHTML = `Player 1: ${score.x}`;\r\n            playerOneScore.id = 'score-x';\r\n            const playerTwoScore = this.createElement('div', 'score-o');\r\n            playerTwoScore.innerHTML = `Player 2: ${score.o}`;\r\n            playerTwoScore.id = 'score-o';\r\n            scoreBoard.append(playerOneScore, playerTwoScore);\r\n        };\r\n        this.updateScore = (currentScore, currentPlayer) => {\r\n            const currentPlayerScore = this.getElement(`#score-${currentPlayer}`);\r\n            const player = (currentPlayer === 'x') ? 'Player 1' : 'Player 2';\r\n            const score = currentScore[currentPlayer];\r\n            currentPlayerScore.innerHTML = `${player}: ${score}`;\r\n        };\r\n        this.displayMessage = (winner) => {\r\n            const message = this.createElement('div', 'message');\r\n            const player = winner === 'x' ? 'Player 1' : 'Player 2';\r\n            message.textContent = winner ? `${player} wins!` : 'It\\'s a draw!';\r\n            const restart = this.getElement('#game');\r\n            restart.append(message);\r\n        };\r\n        this.clearMessage = () => {\r\n            const message = this.getElement('.message');\r\n            message ? message.remove() : '';\r\n        };\r\n        this.clearScore = () => {\r\n            const playerOneScore = this.getElement('.score-x');\r\n            playerOneScore.innerHTML = 'Player 1: 0';\r\n            const playerTwoScore = this.getElement('.score-o');\r\n            playerTwoScore.innerHTML = 'Player 2: 0';\r\n        };\r\n    }\r\n    bindHandler(clickHandler) {\r\n    }\r\n}\r\nexports.BoardGame = BoardGame;\r\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/boardgame.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst boardgame_1 = __webpack_require__(/*! ./boardgame */ \"./src/boardgame.ts\");\r\nconst tictactoe_1 = __webpack_require__(/*! ./tictactoe */ \"./src/tictactoe.ts\");\r\nconst ticTacToe = new tictactoe_1.TicTacToe(new boardgame_1.BoardGame());\r\nticTacToe.startGame();\r\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/index.ts?");

/***/ }),

/***/ "./src/tictactoe.ts":
/*!**************************!*\
  !*** ./src/tictactoe.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.TicTacToe = void 0;\r\nclass TicTacToe {\r\n    constructor(display) {\r\n        this.handleClickedCell = (row, col) => {\r\n            if (this.board[row][col] === '' && this.isOngoing) {\r\n                this.board[row][col] = this.currentPlayer;\r\n                this.display.updateGameBoard(row, col, this.currentPlayer);\r\n                const isGameOver = this.isGameOver(row, col);\r\n                const availableCells = this.board\r\n                    .map(r => r.filter(c => c === ''))\r\n                    .filter(r => r.length > 0);\r\n                if (this.isOngoing) {\r\n                    if (isGameOver) {\r\n                        this.increaseScore();\r\n                        this.display.updateScore(this.scores, this.currentPlayer);\r\n                        this.gameOver(this.currentPlayer);\r\n                    }\r\n                    else if (availableCells.length < 1) {\r\n                        this.gameOver();\r\n                    }\r\n                    else {\r\n                        this.switchPlayer();\r\n                    }\r\n                }\r\n            }\r\n        };\r\n        this.gameOver = (winner) => {\r\n            this.isOngoing = false;\r\n            this.display.displayMessage(winner);\r\n            setTimeout(() => {\r\n                this.resetBoard();\r\n                this.isOngoing = true;\r\n            }, this.waitingTime);\r\n        };\r\n        this.restartGame = () => {\r\n            this.scores = { x: 0, o: 0 };\r\n            this.display.clearScore();\r\n            this.resetBoard();\r\n        };\r\n        this.createNewBoard = () => [\r\n            ['', '', ''],\r\n            ['', '', ''],\r\n            ['', '', '']\r\n        ];\r\n        this.resetBoard = () => {\r\n            this.display.clearMessage();\r\n            this.display.clearGameBoard();\r\n            this.board = this.createNewBoard();\r\n        };\r\n        this.isGameOver = (row, col) => {\r\n            if ((this.board[row][0] === this.currentPlayer &&\r\n                this.board[row][1] === this.currentPlayer &&\r\n                this.board[row][2] === this.currentPlayer) ||\r\n                (this.board[0][col] === this.currentPlayer &&\r\n                    this.board[1][col] === this.currentPlayer &&\r\n                    this.board[2][col] === this.currentPlayer) ||\r\n                ((this.board[0][0] === this.currentPlayer &&\r\n                    this.board[1][1] === this.currentPlayer &&\r\n                    this.board[2][2] === this.currentPlayer) ||\r\n                    (this.board[2][0] === this.currentPlayer &&\r\n                        this.board[1][1] === this.currentPlayer &&\r\n                        this.board[0][2] === this.currentPlayer))) {\r\n                return true;\r\n            }\r\n            return false;\r\n        };\r\n        this.switchPlayer = () => {\r\n            const { x, o } = this.players;\r\n            this.currentPlayer = this.currentPlayer === x ? o : x;\r\n        };\r\n        this.increaseScore = () => {\r\n            this.scores[this.currentPlayer] += 1;\r\n        };\r\n        this.display = display;\r\n        this.board = this.createNewBoard();\r\n        this.players = { x: 'x', o: 'o' };\r\n        this.scores = { x: 0, o: 0 };\r\n        this.waitingTime = 1800;\r\n        this.isOngoing = true;\r\n        this.currentPlayer = this.players.x;\r\n        this.display.bindHandler(this.handleClickedCell);\r\n    }\r\n    startGame() {\r\n        this.display.createScoreBoard(this.scores);\r\n        this.display.createGameBoard(this.board);\r\n        this.display.getElement('.restart').addEventListener('click', this.restartGame);\r\n    }\r\n}\r\nexports.TicTacToe = TicTacToe;\r\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/tictactoe.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;