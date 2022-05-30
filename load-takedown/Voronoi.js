import { Delaunay } from 'https://cdn.skypack.dev/d3-delaunay@6';
import { hsl } from 'https://cdn.skypack.dev/d3@7';

export default class Voronoi {
  constructor(width, height, ctx) {
    this.ctx = ctx;
    this.points = Array(100)
      .fill()
      .map((_, i) => ({
        x: (i * width) / 100,
        y: Math.random() * width,
      }));

    this.delaunay = Delaunay.from(
      this.points,
      (d) => d.x,
      (d) => d.y
    );
    this.width = width;
    this.height = height;
    this.voronoi = this.delaunay.voronoi([0, 0, this.width, this.height]);
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    console.log(this.delaunay.points[0]);
    //draw the delaunay triangle
    // this.drawTriangle();
    //draw the voronoi cell
    this.drawCell();
    //draw the seeds
    // this.drawSeed();
  }

  drawTriangle() {
    this.ctx.beginPath();
    this.delaunay.render(ctx);
    this.ctx.strokeStyle = '#ccc';
    this.ctx.stroke();
  }

  drawCell() {
    this.ctx.beginPath();
    this.voronoi.render(this.ctx);
    this.voronoi.renderBounds(this.ctx);
    this.ctx.strokeStyle = '#000';
    this.ctx.stroke();
    // this.ctx.lineWidth = 1.5;
    // const segments = this.voronoi.render().split(/M/).slice(1);
    // let i = 0;
    // for (let segment of segments) {
    //   this.ctx.beginPath();
    //   // ctx.strokeStyle = hsl(360 * Math.random(), 0.7, 0.5);
    //   this.ctx.strokeStyle = hsl(0, 0, 0.95);
    //   this.ctx.stroke(new Path2D('M' + segment));
    //   // if (i++ % 5 === 0) yield ctx.canvas;
    // }
  }

  drawSeed() {
    this.ctx.beginPath();
    this.delaunay.renderPoints(ctx);
    this.ctx.fill();
  }
}
