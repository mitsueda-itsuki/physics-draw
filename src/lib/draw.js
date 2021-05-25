const pointConv = (x, y, a, lineNum) => [a * lineNum / 2 + a * x, a * lineNum / 2 - a * y]

const magnification = (mag) => {
  if (mag <= 1) {
    return [50, 10]
  } else if (mag === 2) {
    return [25, 20]
  } else if (mag === 3) {
    return [20, 25]
  } else if (mag === 4) {
    return [10, 50]
  } else if (mag === 5) {
    return [5, 100]
  } else if (mag === 6) {
    return [2, 250]
  }
}

export const draw = (
  pointXY,
  arrowsXY,
  mag
) => {
  const [a, lineNum] = magnification(mag)
  const ctx = document.getElementById("canv").getContext("2d")
  ctx.fillStyle = "rgb(245, 245, 245)"
  ctx.fillRect(0, 0, a * lineNum, a * lineNum)
  ctx.strokeStyle = "black"
  ctx.lineWidth = 1
  ctx.beginPath()
  
  // 点の変換
  const point = pointConv(pointXY[0], pointXY[1], a, lineNum)
  // 点の描画
  ctx.arc(point[0], point[1], 2, 0, 360 * Math.PI/180, false)

  // 矢印の変換
  const arrows = arrowsXY.map(arrowXY => [...pointConv(arrowXY[0], arrowXY[1], a, lineNum), ...pointConv(arrowXY[2], arrowXY[3], a, lineNum)])
  // 矢印の描画
  arrows.forEach(arrow => {
    ctx.arrow(arrow[0], arrow[1], arrow[2], arrow[3], [0.1, 0.1, -0.3, 0.1, -1, 1])
  })

  // 格子の描画
  for (let i = 0; i < arrows.length; i++) {
    const [startX, startY, endX, endY] = arrows[i]
    const options = [0.1, 0.1, -0.3, 0.1, -1, 1]
    ctx.arrow(startX, startY, endX, endY, options)
  }

  for (var v = a; v < a * lineNum; v += a) {
    ctx.moveTo(v, 0)
    ctx.lineTo(v, a * lineNum)
  }

  for (var h = a; h < a * lineNum; h += a) {
    ctx.moveTo(0, h)
    ctx.lineTo(a * lineNum, h)
  }

  ctx.stroke()
}