import { Queue } from "./queue.js";
import * as view from "./view.js";
import * as model from "./model.js";

window.addEventListener("load", init);
window.addEventListener("keydown", handleKeydown);

// adjustables
const ROWS = 30;
const COLS = 20;
const TICK_RATE = 100;

// input buffer
const inputBuffer = new Queue();
let direction = "left";
inputBuffer.enqueue(direction);

// game state
const board = model.newBoard(ROWS, COLS);
let snake = model.newSnake(board);

let food = model.generateFood(board);
let gamerunning = false;
let firstRun = true;

function init() {
  view.init(board);
  tick();
}

function tick() {
  setTimeout(tick, TICK_RATE);
  if (!gamerunning && !firstRun) {
    view.displayGameOver();
    return;
  } else if (!gamerunning) {
    return;
  }
  // process one direction pr tick
  const bufferedDirection = inputBuffer.dequeue();
  if (bufferedDirection) {
    direction = bufferedDirection;
  }

  model.moveSnake(board, snake, direction, food);
  if (model.checkCollision(snake)) {
    gamerunning = false;
    restart();
  }
  if (model.checkFood(food, snake)) {
    food = model.generateFood(board);
  }
  render();
}

// add direction to input buffer
function handleKeydown(event) {
  switch (event.key) {
    case "w":
    case "ArrowUp":
      if (direction !== "down") inputBuffer.enqueue("up");
      break;
    case "s":
    case "ArrowDown":
      if (direction !== "up") inputBuffer.enqueue("down");
      break;
    case "a":
    case "ArrowLeft":
      if (direction !== "right") inputBuffer.enqueue("left");
      break;
    case "d":
    case "ArrowRight":
      if (direction !== "left") inputBuffer.enqueue("right");
      break;
    case " ":
    case "Enter":
      if (!gamerunning) {
        gamerunning = true;
        if (firstRun) {
          firstRun = false;
          view.removeFirstRun();
        }
        view.removeGameOver();
        restart();
      }
      break;
    default:
      break;
  }
}

// refresh grid rendering
function render() {
  model.clearBoard(board);
  model.putSnakeOnBoard(board, snake);
  model.putFoodOnBoard(board, food);
  view.displayGrid(board);
}

// restart game
function restart() {
  snake = model.newSnake(board);
  food = model.generateFood(board);
  direction = "left";
  render();
}
