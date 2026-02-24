// IMPORT
import CanvasController from "./controller.ts";

// INSTANCES, VAR

const canvas = document.querySelector("#canvas")! as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const canvasController = new CanvasController(ctx);
console.log(canvasController);

