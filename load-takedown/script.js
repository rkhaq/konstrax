import Voronoi from './Voronoi.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let voronoi = new Voronoi(canvas.width, canvas.height, ctx);

ctx.canvas.onmousemove = (e) => {
  e.preventDefault();
  voronoi.points[0] = { x: e.layerX, y: e.layerY };
  voronoi.update();
};

voronoi.update();

window.addEventListener('resize', voronoi.update);
