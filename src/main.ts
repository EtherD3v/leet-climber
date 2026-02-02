// IMPORT

import Player from "./components/player.ts";
import CanvasController from "./controller.ts";

// INSTANCES, VAR

const canvas = document.querySelector("#canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const groundRect = document.querySelector("#ground").getBoundingClientRect();

const player = new Player(ctx, groundRect);

const canvasController = new CanvasController(canvas, player);

// DEBUG

console.log(`player coords : [ x = ${player.x}; y = ${player.y} ]`);
console.log(`canvas : [ height = ${canvas.height}; width = ${canvas.width} ]`)

