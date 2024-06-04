console.log("# Tetris Game #");

const PADDING = 50;
const CANVAS_WIDTH = 300 + (PADDING * 2);
const CANVAS_HEIGHT = 600 + (PADDING * 2);
const CANVAS_COLOR = '#000';

// const CELL_COLOR = '#222';
const COLUMNS = 10;
const ROWS = 20;
const CELL_SIZE = 30;

const CELL_COUNT = ROWS * COLUMNS;
const COLORS = ['#222', '#ffee32'];

let frameSpeed = 10;
let cells = new Array(CELL_COUNT).fill(0);
let currX = 3;
let currY = -1;

const chapeHeight = {
  '|': 1,
  '⊥': 2,
  '□': 2,
  '└': 3,
  '┘': 3,
  '┐': 3,
  '┌': 3,
  '⌐': 2,
  '¬': 2,
  '⊣': 3,
  '⊢': 3,
  '┬': 2
}

const shapes = ['|', '⊥', '⊣', '⊢', '┬', '□', '└', '┘', '┐', '┌', '⌐', '¬', 'S', 'Z', '-'];
let currShape = '┬';


function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(CANVAS_COLOR);
  noStroke(); // prevents p5js from adding a border to the cells (rectangles) that make up the grid.
  frameRate(frameSpeed);
}

function draw() {
  renderCells();
  /** check collaption */
  if (southCollapsed(currX, currY)) {
    // currShape = shapes[randomInt(0, 8)];
    currX = 3;
    currY = -1;
  }
  /** keep moving down if no south cllapsion of attend map limit */
  currY++;
  if (currY >= 0 && currY <= ROWS - chapeHeight[currShape]) {
    if (currY > 0)
      // clear previous position of the shape
      cleanShape(currShape, currX, currY - 1);
    // cells[cellIndex(currX, currY - 1)] = 0;
    // draw new position of the shape
    drawShape(currShape, currX, currY);
    // cells[cellIndex(currX, currY)] = 1;
  }
}
function drawShape(shape, x, y) {
  //TODO: check rotation direction
  if (shape === '|') {
    for (let i = x; i < x + 4; i++) {
      cells[cellIndex(i, y)] = 1;
    }
  }
  else if (shape === '⊥') {
    cells[cellIndex(x + 1, y)] = 1;
    for (let i = x; i < x + 3; i++) {
      cells[cellIndex(i, y + 1)] = 1;
    }
  }
  else if (shape === '□') {
    for (let j = y; j < y + 2; j++) {
      for (let i = x; i < x + 2; i++) {
        cells[cellIndex(i, j)] = 1;
      }
    }
  }
  else if (shape === '└') {
    for (let j = y; j < y + 3; j++) {
      cells[cellIndex(x, j)] = 1;
    }
    cells[cellIndex(x + 1, y + 2)] = 1;
  }
  else if (shape === '┘') {
    for (let j = y; j < y + 3; j++) {
      cells[cellIndex(x + 1, j)] = 1;
    }
    cells[cellIndex(x, y + 2)] = 1;
  }
  else if (shape === '┐') {
    for (let j = y; j < y + 3; j++) {
      cells[cellIndex(x + 1, j)] = 1;
    }
    cells[cellIndex(x, y)] = 1;
  }
  else if (shape === '┌') {
    for (let j = y; j < y + 3; j++) {
      cells[cellIndex(x, j)] = 1;
    }
    cells[cellIndex(x + 1, y)] = 1;
  }
  else if (shape === '⌐') {
    for (let i = x; i < x + 3; i++) {
      cells[cellIndex(i, y)] = 1;
    }
    cells[cellIndex(x, y + 1)] = 1;
  }
  else if (shape === '¬') {
    for (let i = x; i < x + 3; i++) {
      cells[cellIndex(i, y)] = 1;
    }
    cells[cellIndex(x + 2, y + 1)] = 1;
  }
  else if (shape === '⊣') {
    for (let j = y; j < y + 3; j++) {
      cells[cellIndex(x + 1, j)] = 1;
    }
    cells[cellIndex(x, y + 1)] = 1;
  }
  else if (shape === '⊢') {
    for (let j = y; j < y + 3; j++) {
      cells[cellIndex(x, j)] = 1;
    }
    cells[cellIndex(x + 1, y + 1)] = 1;
  }
  else if (shape === '┬') {
    for (let i = x; i < x + 3; i++) {
      cells[cellIndex(i, y)] = 1;
    }
    cells[cellIndex(x + 1, y + 1)] = 1;
  }

}

function cleanShape(shape, x, y) {
  if (shape === '|') {
    for (let i = x; i < x + 4; i++) {
      cells[cellIndex(i, y)] = 0;
    }
  }
  else if (shape === '⊥') {
    cells[cellIndex(x + 1, y)] = 0;
    for (let i = x; i < x + 3; i++) {
      if (i !== x + 1)
        cells[cellIndex(i, y + 1)] = 0;
    }
  }
  else if (shape === '□') {
    for (let j = y; j < y + 2; j++) {
      for (let i = x; i < x + 2; i++) {
        cells[cellIndex(i, j)] = 0;
      }
    }
  }
  else if (shape === '└') {
    for (let j = y; j < y + 3; j++) {
      cells[cellIndex(x, j)] = 0;
    }
    cells[cellIndex(x + 1, y + 2)] = 0;
  }
  else if (shape === '┘') {
    for (let j = y; j < y + 3; j++) {
      cells[cellIndex(x + 1, j)] = 0;
    }
    cells[cellIndex(x, y + 2)] = 0;
  }
  else if (shape === '┐') {
    for (let j = y; j < y + 3; j++) {
      cells[cellIndex(x + 1, j)] = 0;
    }
    cells[cellIndex(x, y)] = 0;
  }
  else if (shape === '┌') {
    for (let j = y; j < y + 3; j++) {
      cells[cellIndex(x, j)] = 0;
    }
    cells[cellIndex(x + 1, y)] = 0;
  }
  else if (shape === '⌐') {
    for (let i = x; i < x + 3; i++) {
      cells[cellIndex(i, y)] = 0;
    }
    cells[cellIndex(x, y + 1)] = 0;
  }
  else if (shape === '¬') {
    for (let i = x; i < x + 3; i++) {
      cells[cellIndex(i, y)] = 0;
    }
    cells[cellIndex(x + 2, y + 1)] = 0;
  }
  else if (shape === '⊣') {
    for (let j = y; j < y + 3; j++) {
      cells[cellIndex(x + 1, j)] = 0;
    }
    cells[cellIndex(x, y + 1)] = 0;
  }
  else if (shape === '⊢') {
    for (let j = y; j < y + 3; j++) {
      cells[cellIndex(x, j)] = 0;
    }
    cells[cellIndex(x + 1, y + 1)] = 0;
  }
  else if (shape === '┬') {
    for (let i = x; i < x + 3; i++) {
      cells[cellIndex(i, y)] = 0;
    }
    cells[cellIndex(x + 1, y + 1)] = 0;
  }
}

function renderCells() {
  let left = PADDING;
  let top = PADDING;
  let leftEnd = left + COLUMNS * CELL_SIZE;
  let size = CELL_SIZE - 2;


  for (let i = 0; i < cells.length; i++) {
    fill(COLORS[cells[i]]);
    rect(left, top, size, size);

    left += CELL_SIZE;
    if (left === leftEnd) {
      left = PADDING;
      top += CELL_SIZE;
    }
  }
}

// ArrowRight ArrowUp ArrowDown ArrowLeft

function keyPressed() {
  if (key === 'ArrowLeft') {
    if (currShape === '|') {
      if (leftCollapsed(currX, currY) === false) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX - 1, currY)] = 1;
        drawShape(currShape, currX - 1, currY);
        currX--;
      }
    }
    else if (currShape === '⊥') {
      if (leftCollapsed(currX + 1, currY) === false && leftCollapsed(currX, currY + 1) === false) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX - 1, currY);
        currX--;
      }
    }
    else if (currShape === '□') {
      if (leftCollapsed(currX, currY) === false && leftCollapsed(currX, currY + 1) === false) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX - 1, currY);
        currX--;
      }
    }
    else if (currShape === '└' || currShape === '┌' || currShape === '⊢') {
      if (leftCollapsed(currX, currY) === false
        && leftCollapsed(currX, currY + 1) === false
        && leftCollapsed(currX, currY + 2) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX - 1, currY);
        currX--;
      }
    }
    else if (currShape === '┘') {
      if (leftCollapsed(currX + 1, currY) === false
        && leftCollapsed(currX + 1, currY + 1) === false
        && leftCollapsed(currX, currY + 2) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX - 1, currY);
        currX--;
      }
    }
    else if (currShape === '┐') {
      if (leftCollapsed(currX, currY) === false
        && leftCollapsed(currX + 1, currY + 1) === false
        && leftCollapsed(currX + 1, currY + 2) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX - 1, currY);
        currX--;
      }
    }
    else if (currShape === '⌐') {
      if (leftCollapsed(currX, currY) === false
        && leftCollapsed(currX, currY + 1) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX - 1, currY);
        currX--;
      }
    }
    else if (currShape === '¬') {
      if (leftCollapsed(currX, currY) === false
        && leftCollapsed(currX + 2, currY + 1) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX - 1, currY);
        currX--;
      }
    }
    else if (currShape === '⊣') {
      if (leftCollapsed(currX, currY + 1) === false
        && leftCollapsed(currX + 1, currY) === false
        && leftCollapsed(currX + 1, currY + 2) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX - 1, currY);
        currX--;
      }
    }
    else if (currShape === '┬') {
      if (leftCollapsed(currX, currY) === false
        && leftCollapsed(currX + 1, currY + 1) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX - 1, currY);
        currX--;
      }
    }

  } else if (key === 'ArrowRight') {
    if (currShape === '|') {
      if (rightCollapsed(currX + 3, currY) === false) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX + 1, currY);
        currX++;
      }
    }
    else if (currShape === '⊥') {
      if (rightCollapsed(currX + 1, currY) === false && rightCollapsed(currX + 2, currY + 1) === false) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX + 1, currY);
        currX++;
      }
    }
    else if (currShape === '□') {
      if (rightCollapsed(currX + 1, currY) === false && rightCollapsed(currX + 1, currY + 1) === false) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX + 1, currY);
        currX++;
      }
    }
    else if (currShape === '└') {
      if (rightCollapsed(currX, currY) === false
        && rightCollapsed(currX, currY + 1) === false
        && rightCollapsed(currX + 1, currY + 2) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX + 1, currY);
        currX++;
      }
    }
    else if (currShape === '┘') {
      if (rightCollapsed(currX + 1, currY) === false
        && rightCollapsed(currX + 1, currY + 1) === false
        && rightCollapsed(currX + 1, currY + 2) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX + 1, currY);
        currX++;
      }
    }
    else if (currShape === '┐' || currShape === '⊣') {
      if (rightCollapsed(currX + 1, currY) === false
        && rightCollapsed(currX + 1, currY + 1) === false
        && rightCollapsed(currX + 1, currY + 2) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX + 1, currY);
        currX++;
      }
    }
    else if (currShape === '┌') {
      if (rightCollapsed(currX + 1, currY) === false
        && rightCollapsed(currX, currY + 1) === false
        && rightCollapsed(currX, currY + 2) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX + 1, currY);
        currX++;
      }
    }
    else if (currShape === '⌐') {
      if (rightCollapsed(currX + 2, currY) === false
        && rightCollapsed(currX, currY + 1) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX + 1, currY);
        currX++;
      }
    }
    else if (currShape === '¬') {
      if (rightCollapsed(currX + 2, currY) === false
        && rightCollapsed(currX + 2, currY + 1) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX + 1, currY);
        currX++;
      }
    }
    else if (currShape === '⊢') {
      if (rightCollapsed(currX, currY) === false
        && rightCollapsed(currX + 1, currY + 1) === false
        && rightCollapsed(currX, currY + 2) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX + 1, currY);
        currX++;
      }
    }
    else if (currShape === '┬') {
      if (rightCollapsed(currX + 2, currY) === false
        && rightCollapsed(currX + 1, currY + 1) === false
        && rightCollapsed(currX + 1, currY + 2) === false
      ) {
        // cells[cellIndex(currX, currY)] = 0;
        cleanShape(currShape, currX, currY);
        // cells[cellIndex(currX + 1, currY)] = 1;
        drawShape(currShape, currX + 1, currY);
        currX++;
      }
    }
  }

  else if (key === 'ArrowDown') {
    console.log("ArrowDown");
  }
}


/** indexing functions */
// x: column
// y: row

function cellIndex(x, y) {
  return (y * COLUMNS) + x;
}

function southIndex(x, y) {
  if (y === ROWS - 1) return -1;
  return cellIndex(x, y + 1);
}

function rightIndex(x, y) {
  if (x === COLUMNS - 1) return -1;
  return cellIndex(x + 1, y);
}

function leftIndex(x, y) {
  if (x === 0) return -1;
  return cellIndex(x - 1, y);
}

/** collaption funcittions */

function southCollapsed(x, y) {
  if (currShape === '|') {
    if (y + 3 === ROWS - 1) return true;
    for (let i = x; i < x + 4; i++) {
      let southIdx = southIndex(i, y);
      if (southIdx !== -1 && cells[southIdx] === 1) return true;
    }
    return false;
  }
  else if (currShape === '⊥') {
    if (y + 1 === ROWS - 1) return true;
    for (let i = x; i < x + 3; i++) {
      let southIdx = southIndex(i, y + 1);
      if (southIdx !== -1 && cells[southIdx] === 1) return true;
    }
    return false;
  }
  else if (currShape === '□') {
    if (y + 1 === ROWS - 1) return true;
    for (let i = x; i < x + 2; i++) {
      let southIdx = southIndex(i, y + 1);
      if (southIdx !== -1 && cells[southIdx] === 1) return true;
    }
    return false;
  }
  else if (currShape === '└' || currShape === '┘') {
    if (y + 2 === ROWS - 1) return true;
    for (let i = x; i < x + 2; i++) {
      let southIdx = southIndex(i, y + 2);
      if (southIdx !== -1 && cells[southIdx] === 1) return true;
    }
    return false;
  }
  else if (currShape === '┐') {
    if (y + 2 === ROWS - 1) return true;
    let southIdx = southIndex(x, y);
    if (southIdx !== -1 && cells[southIdx] === 1) return true;
    southIdx = southIndex(x + 1, y + 2);
    if (southIdx !== -1 && cells[southIdx] === 1) return true;
    return false;
  }
  else if (currShape === '┌') {
    if (y + 2 === ROWS - 1) return true;
    let southIdx = southIndex(x + 1, y);
    if (southIdx !== -1 && cells[southIdx] === 1) return true;
    southIdx = southIndex(x, y + 2);
    if (southIdx !== -1 && cells[southIdx] === 1) return true;
    return false;
  }
  else if (currShape === '⌐') {
    if (y + 1 === ROWS - 1) return true;
    let southIdx = southIndex(x, y + 1);
    if (southIdx !== -1 && cells[southIdx] === 1) return true;
    for (let i = x + 1; i < x + 3; i++) {
      let southIdx = southIndex(i, y);
      if (southIdx !== -1 && cells[southIdx] === 1) return true;
    }
    return false;
  }
  else if (currShape === '¬') {
    if (y + 1 === ROWS - 1) return true;
    let southIdx = southIndex(x + 2, y + 1);
    if (southIdx !== -1 && cells[southIdx] === 1) return true;
    for (let i = x; i < x + 2; i++) {
      let southIdx = southIndex(i, y);
      if (southIdx !== -1 && cells[southIdx] === 1) return true;
    }
    return false;
  }
  else if (currShape === '⊣') {
    if (y + 2 === ROWS - 1) return true;
    let southIdx = southIndex(x + 1, y + 2);
    if (southIdx !== -1 && cells[southIdx] === 1) return true;
    southIdx = southIndex(x, y + 1);
    if (southIdx !== -1 && cells[southIdx] === 1) return true;
    return false;
  }
  else if (currShape === '⊢') {
    if (y + 2 === ROWS - 1) return true;
    let southIdx = southIndex(x, y + 2);
    if (southIdx !== -1 && cells[southIdx] === 1) return true;
    southIdx = southIndex(x + 1, y + 1);
    if (southIdx !== -1 && cells[southIdx] === 1) return true;
    return false;
  }
  else if (currShape === '┬') {
    if (y + 1 === ROWS - 1) return true;
    let southIdx = southIndex(x, y);
    if (southIdx !== -1 && cells[southIdx] === 1) return true;
    southIdx = southIndex(x + 1, y + 1);
    if (southIdx !== -1 && cells[southIdx] === 1) return true;
    southIdx = southIndex(x + 2, y);
    if (southIdx !== -1 && cells[southIdx] === 1) return true;
    return false;
  }
  return false;
}

function leftCollapsed(x, y) {
  let leftIdx = leftIndex(x, y);
  if (x === 0 || (leftIdx !== -1 && cells[leftIdx] === 1)) return true;
  return false;
}

function rightCollapsed(x, y) {
  let rightIdx = rightIndex(x, y);
  //TODO:check if shape width bigger than 1 other cases than (x === COLUMNS - 1)
  if (x === COLUMNS - 1 || (rightIdx !== -1 && cells[rightIdx] === 1)) return true;
  return false;
}

/** calculation functions */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
