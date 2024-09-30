import { Grid } from "./grid.js";
import { Queue } from "./queue.js";
import * as view from "./view.js";

window.addEventListener("load", init);
window.addEventListener("keydown", handleKeydown);

// Adjustables
const ROWS = 30;
const COLS = 30;
const TICK_RATE = 100;

// state variables
const grid = new Grid(ROWS, COLS);
const inputBuffer = new Queue();
const snake = new Queue();
snake.enqueue({ row: Math.floor(ROWS / 2), col: Math.floor(COLS / 2) });
let food = generateFood();
let direction = "left";
let nextDirection = direction;
let gamerunning = false;
let firstRun = true;

function init() {
  view.init(grid);
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
    nextDirection = bufferedDirection;
  }

  moveSnake();
  if (checkCollision()) {
    gamerunning = false;
    restart();
  }
  if (checkFood()) {
    food = generateFood();
  }
  render();
}

// add direction to input buffer
function handleKeydown(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") inputBuffer.enqueue("up");
      break;
    case "ArrowDown":
      if (direction !== "up") inputBuffer.enqueue("down");
      break;
    case "ArrowLeft":
      if (direction !== "right") inputBuffer.enqueue("left");
      break;
    case "ArrowRight":
      if (direction !== "left") inputBuffer.enqueue("right");
      break;
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

function moveSnake() {
  direction = nextDirection;
  const head = snake.tail?.data;
  let newHead;
  switch (direction) {
    case "up":
      newHead = { row: head.row - 1, col: head.col };
      break;
    case "down":
      newHead = { row: head.row + 1, col: head.col };
      break;
    case "left":
      newHead = { row: head.row, col: head.col - 1 };
      break;
    case "right":
      newHead = { row: head.row, col: head.col + 1 };
      break;
  }

  // Wrap around the edges
  if (newHead.row < 0) {
    newHead.row = ROWS - 1;
  } else if (newHead.row >= ROWS) {
    newHead.row = 0;
  }
  if (newHead.col < 0) {
    newHead.col = COLS - 1;
  } else if (newHead.col >= COLS) {
    newHead.col = 0;
  }

  snake.enqueue(newHead);
  // if snake did not eat food, remove last segment (queue head)
  if (!checkFood()) {
    snake.dequeue();
  }
}

// checks if snake collided with itself
function checkCollision() {
  const head = snake.tail?.data;
  // loop without looking at snake head (queue tail)
  for (
    let segment = snake.head;
    segment !== snake.tail;
    segment = segment.next
  ) {
    if (segment.data.row === head.row && segment.data.col === head.col) {
      return true;
    }
  }
  return false;
}

// check if snakes head (queue tail) is on food
function checkFood() {
  const head = snake.tail?.data;
  return head.row === food.row && head.col === food.col;
}

// generate food at random location
function generateFood() {
  let newFood;
  newFood = {
    row: Math.floor(Math.random() * ROWS),
    col: Math.floor(Math.random() * COLS),
  };
  return newFood;
}

// refresh grid rendering
function render() {
  grid.clear();
  for (let segment = snake.head; segment !== null; segment = segment.next) {
    grid.set(segment.data.row, segment.data.col, 1);
  }
  grid.set(food.row, food.col, 2);
  view.displayGrid(grid);
}

// restart game
function restart() {
  snake.clear();
  snake.enqueue({ row: Math.floor(ROWS / 2), col: Math.floor(COLS / 2) });
  food = generateFood();
  direction = "left";
  nextDirection = direction;
  render();
}
