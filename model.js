import { Grid } from "./grid.js";
import { Queue } from "./queue.js";

export function newBoard(rows, cols) {
  return new Grid(rows, cols);
}

export function clearBoard(board) {
  board.clear();
}

export function putSnakeOnBoard(board, snake) {
  for (let part = snake.head; part !== null; part = part.next) {
    board.set(part.data.row, part.data.col, 1);
  }
}

export function putFoodOnBoard(board, food) {
  board.set(food.row, food.col, 2);
}

export function newSnake(board) {
  const snake = new Queue();
  snake.enqueue({
    row: Math.floor(board.rowNum / 2),
    col: Math.floor(board.colNum / 2),
  });
  return snake;
}

export function addSnakePart(snake, row, col) {
  snake.enqueue({ row, col });
}

export function removeSnakePart(snake) {
  return snake.dequeue();
}

export function getSnakeHead(snake) {
  return snake.getTail();
}

export function getSnakeTail(snake) {
  return snake.getHead();
}

export function moveSnake(board, snake, direction, food) {
  const head = getSnakeHead(snake);
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

  // wrap around edges
  if (newHead.row < 0) {
    newHead.row = board.rowNum - 1;
  } else if (newHead.row >= board.rowNum) {
    newHead.row = 0;
  }
  if (newHead.col < 0) {
    newHead.col = board.colNum - 1;
  } else if (newHead.col >= board.colNum) {
    newHead.col = 0;
  }

  addSnakePart(snake, newHead.row, newHead.col);
  // if snake did not eat food, remove last segment (queue head)
  if (!checkFood(food, snake)) {
    removeSnakePart(snake);
  }
}

export function generateFood(board) {
  const row = Math.floor(Math.random() * board.rowNum);
  const col = Math.floor(Math.random() * board.colNum);
  return { row, col };
}

// checks if snake collided with itself
export function checkCollision(snake) {
  const head = getSnakeHead(snake);
  // loop without looking at snake head (queue tail)
  for (let part = snake.head; part !== snake.tail; part = part.next) {
    if (part.data.row === head.row && part.data.col === head.col) {
      return true;
    }
  }
  return false;
}

// check if snakes head (queue tail) is on food
export function checkFood(food, snake) {
  const head = getSnakeHead(snake);
  return head.row === food.row && head.col === food.col;
}
