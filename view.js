export function init(grid) {
  for (let i = 0; i < grid.rowNum; i++) {
    for (let j = 0; j < grid.colNum; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      document.querySelector("#grid").appendChild(cell);
    }
  }
  document.documentElement.style.setProperty("--row-num", grid.rowNum);
  document.documentElement.style.setProperty("--col-num", grid.colNum);
}

export function displayGrid(grid) {
  const cells = document.querySelectorAll("#grid .cell");
  for (const cell of cells) {
    cell.classList.remove("snake", "food");
  }
  for (let i = 0; i < grid.rowNum; i++) {
    for (let j = 0; j < grid.colNum; j++) {
      const cell = document.querySelector(
        `.cell[data-row="${i}"][data-col="${j}"]`
      );

      if (grid.grid[i][j] === 0) {
        cell.classList.remove("snake", "food");
      } else if (grid.grid[i][j] === 1) {
        cell.classList.add("snake");
      } else if (grid.grid[i][j] === 2) {
        cell.classList.add("food");
      }
    }
  }
}

export function displayGameOver() {
  const gameOver = document.querySelector(".game-over");
  gameOver.style.display = "block";
  displayBackdrop();
}

export function removeGameOver() {
  const gameOver = document.querySelector(".game-over");
  gameOver.style.display = "none";
  removeBackdrop();
}

export function removeFirstRun() {
  const firstRun = document.querySelector(".game-begin");
  firstRun.style.display = "none";
  removeBackdrop();
}

export function removeBackdrop() {
  const backdrop = document.querySelector(".overlay-backdrop");
  backdrop.style.display = "none";
}

export function displayBackdrop() {
  const backdrop = document.querySelector(".overlay-backdrop");
  backdrop.style.display = "block";
}
