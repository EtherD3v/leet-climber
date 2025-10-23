const canvas = document.querySelector("#canvas")!;
const ctx = canvas.getContext("2d");

document.body.style.margin = 0;
document.body.style.overflow = "hidden";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);
