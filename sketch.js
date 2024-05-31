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

let cells = new Array(CELL_COUNT).fill(0);
let currX = 0;
let currY = 0;
cells[cellIndex(currX, currY)] = 1;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(CANVAS_COLOR);
  noStroke(); // prevents p5js from adding a border to the cells (rectangles) that make up the grid.
  frameRate(10);
}


function draw() {
  renderCells();

  /** check collaption */
  if (southCollapsed(currX, currY)) {
    currY = -1;
  }

  /** keep moving down if no south cllapsion of attend map limit */
  currY++;

  if (currY <= ROWS - 1) {
    cells[cellIndex(currX, currY)] = 1;
    if (currY > 0)
      cells[cellIndex(currX, currY - 1)] = 0;
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

function keyPressed() {
  if (key === 'a') {
    console.log("a");
  } else {
    console.log("not a");
  }
  // Uncomment to prevent any default behavior.
  // return false;
}

// x: column
// y: row
function cellIndex(x, y) {
  return (y * COLUMNS) + x;
}

function southIndex(x, y) {
  if (y === ROWS - 1) return -1;
  return cellIndex(x, y + 1)
}

function northIndex(x, y) {
  if (y === 0) return -1;
  return cellIndex(x, y - 1)
}

function rightIndex(x, y) {
  if (x === COLUMNS - 1) return -1;
  return cellIndex(x + 1, y)
}

function leftIndex(x, y) {
  if (x === 0) return -1;
  return cellIndex(x - 1, y)
}

function southCollapsed(x, y) {
  let southIdx = southIndex(x, y);
  if (y === ROWS - 1 || (southIdx !== -1 && cells[southIdx] === 1)) return true
  return false
}

function leftCollapsed(x, y) {
  let leftIdx = leftIndex(x, y);
  if (x === 0 || (leftIdx !== -1 && cells[leftIdx] === 1)) return true
  return false
}

function rightCollapsed(x, y) {
  let rightIdx = rightIndex(x, y);
  if (x === COLUMNS - 1 || (rightIdx !== -1 && cells[rightIdx] === 1)) return true
  return false
}

