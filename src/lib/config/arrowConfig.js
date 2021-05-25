export const arrowConfig = () => {((target) => {
  if (!target || !target.prototype) return;
  target.prototype.arrow = function(startX, startY, endX, endY, options) {
    const xDiff = endX - startX;
    const yDiff = endY - startY;
    const len = (xDiff ** 2 + yDiff ** 2) ** 0.5;
    const sin = yDiff / len;
    const cos = xDiff / len;
    const op = [];
    op.push(0, 0);
    for (let i = 0; i < options.length; i += 2) {
      const [x, y] = options.slice(i, i+2);
      op.push(x < 0 ? len + x : x, y);
    }
    op.push(len, 0);
    for (let i = options.length; i > 0; i -= 2) {
      const [y, x] = options.slice(i-2, i);
      op.push(x < 0 ? len + x : x, -y);
    }
    op.push(0, 0);
    for (let i = 0; i < op.length; i += 2) {
      const x = op[i] * cos - op[i+1] * sin + startX;
      const y = op[i] * sin + op[i+1] * cos + startY;
      if (i === 0) this.moveTo(x, y);
      else this.lineTo(x, y);
    }
  };
})(CanvasRenderingContext2D);};
