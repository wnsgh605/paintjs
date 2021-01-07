const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let fill = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startPainting() {
  painting = true;
  document.addEventListener("mouseup", stopPainting);
}

function stopPainting() {
  painting = false;
}

function changeColor(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

function handleMode() {
  if (fill === true) {
    fill = false;
    mode.innerHTML = "Fill";
  } else {
    fill = true;
    mode.innerHTML = "Draw";
  }
}

function fillCanvas() {
  if (fill) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function noShow(event) {
  event.preventDefault();
}

function saveImg() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "MyPainting";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", changeColor)
  );
  canvas.addEventListener("click", fillCanvas);
  canvas.addEventListener("contextmenu", noShow);
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleMode);
}

if (save) {
  save.addEventListener("click", saveImg);
}
