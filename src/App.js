import { arrowConfig } from "./lib/config/arrowConfig"
import { draw } from "./lib/draw"
import { useEffect, useState } from 'react';
import { generateRand } from './lib/lfsr'

const generateGraph = (pointXY, binaryList) => {
  const points = [pointXY]
  const arrows = []
  for (let i = 0; i < binaryList.length / 2; i++) {
    const xMove = binaryList[i * 2] ? 1 : -1
    const yMove = binaryList[i * 2 +1] ? 1 : -1
    points.push([points.slice(-1)[0][0] + xMove, points.slice(-1)[0][1] + yMove])
    arrows.push([points.slice(-2)[0][0], points.slice(-2)[0][1], points.slice(-1)[0][0], points.slice(-1)[0][1]])
  }
  return [points, arrows]
}

function App() {
  const [rand, setRand] = useState(null)
  const [randStr, setRandStr] = useState('')
  const [size, setSize] = useState(1000)
  const [primitivePolynomial, setPrimitivePolynomial] = useState([10, 7])
  // const [interval, setInterval] = useState(0.5)
  const [binaryFlag, setBinaryFlag] = useState(0)
  const [initial, setInitial] = useState(2)
  const [magnification, setMagnification] = useState(1)
  const [showAll, setShowAll] = useState(false)
  const [showingGraph, setShowingGraph] = useState(false)
  const [recommendedFlag, setRecommendedFlag] = useState(false)

  useEffect(() => {
    arrowConfig()
  })

  const changeSize = (event) => {
    setSize(event.target.value)
  }

  const changePrimitivePolynomial = (event) => {
    setPrimitivePolynomial(event.target.value.split(" ").map(num => parseInt(num)))
  }

  // const changeInterval = (event) => {
  //   setInterval(event.target.value)
  // }

  const changeInitial = (event) => {
    setInitial(event.target.value)
  }

  const changeBinaryFlag = (event) => {
    setBinaryFlag(parseInt(event.target.value))
  }

  const enlargeMagnification = () => {
    let magnificationNow = magnification
    if (magnification > 1) {
      magnificationNow -= 1
      setMagnification(magnificationNow)
    }
    if (rand === null) return;
    const [points, arrows] = generateGraph([0, 0], rand)
    draw(points.slice(-1)[0], arrows, magnificationNow)
  }
  
  const reduceMagnification = () => {
    let magnificationNow = magnification
    if (magnification < 6) {
      magnificationNow += 1
      setMagnification(magnificationNow + 1)
    }
    setMagnification(magnificationNow)
    if (rand === null) return;
    const [points, arrows] = generateGraph([0, 0], rand)
    draw(points.slice(-1)[0], arrows, magnificationNow)
  }

  const changeShowSize = () => {
    setShowAll(!showAll)
  }

  const changeRecommendedFlag = () => {
    setRecommendedFlag(!recommendedFlag)
  }

  const generateRandClick = () => {
    if (size <= 0) {
      alert("数値は0以上である必要があります")
    }
    if (size > 100000) {
      alert("数値が大きすぎます")
    }
    // if (interval < 0.003) {
    //   alert("インターバルが短すぎます")
    // }
    // if (interval > 3) {
    //   alert("インターバルが長すぎます")
    // }
    if (initial <= 0) {
      alert("初期値は1以上に設定してください")
    }
    if (initial > 100000) {
      alert("初期値が大きすぎます")
    }
    const randList = generateRand(size, initial, primitivePolynomial)
    const randListBinary = randList.map(rand => rand % 2)
    setRand(randListBinary)
    setRandStr(binaryFlag ? randListBinary.toString() : randList.toString())
    setMagnification(1)
    setShowingGraph(true)
    const [points, arrows] = generateGraph([0, 0], randListBinary)
    draw(points.slice(-1)[0], arrows, magnification)
  }

  const setRecommended1 = () => {
    setSize(1000)
    setPrimitivePolynomial([11, 9])
  }

  const setRecommended2 = () => {
    setSize(2000)
    setPrimitivePolynomial([18, 11])
  }

  return (
    <div>
      <label htmlFor="size">ランダムウォークの回数</label>
      <span>  </span>
      <input type="number" name="size" value={size} onChange={changeSize} />
      <br />
      <label htmlFor="initial">レジスタの初期値</label>
      <span>  </span>
      <input type="number" name="initial" value={initial} onChange={changeInitial} />
      <br />
      <label htmlFor="pp">使用する原始多項式</label>
      <span>  </span>
      <select name="pp" value={`${primitivePolynomial[0]}, ${primitivePolynomial[1]}`} onChange={changePrimitivePolynomial}>
        <option value={"3, 2"}>x&#x00B3; + x&#x00B2; + 1</option>
        <option value={"4, 3"}>x&#x2074; + x&#x00B3; + 1</option>
        <option value={"5, 3"}>x&#x2075; + x&#x00B3; + 1</option>
        <option value={"6, 5"}>x&#x2076; + x&#x2075; + 1</option>
        <option value={"7, 6"}>x&#x2077; + x&#x2076; + 1</option>
        <option value={"9, 5"}>x&#x2079; + x&#x2075; + 1</option>
        <option value={"10, 7"}>x&#x00B9;&#x2070; + x&#x2077; + 1</option>
        <option value={"11, 9"}>x&#x00B9;&#x00B9; + x&#x2079; + 1</option>
        <option value={"15, 14"}>x&#x00B9;&#x2075; + x&#x00B9;&#x2074; + 1</option>
        <option value={"17, 14"}>x&#x00B9;&#x2077; + x&#x00B9;&#x2074; + 1</option>
        <option value={"18, 11"}>x&#x00B9;&#x2078; + x&#x00B9;&#x00B9; + 1</option>
      </select>
      <br />
      <label htmlFor="binaryFlag">乱数列を0/1で表示する</label>
      <span>  </span>
      <select name="binaryFlag" onChange={changeBinaryFlag}>
        <option value={0}>しない</option>
        <option value={1}>する</option>
      </select>
      <br />
      <span>拡大(近づく)</span>  <button onClick={enlargeMagnification}>+</button>
      <span>  </span>
      <span>縮小(遠ざかる)</span>  <button onClick={reduceMagnification}>-</button>
      <span>  </span>
      <span>設定値: {7 - magnification} (1 &le; x &le; 6, 小さいほど遠ざかります)</span>
      <br />
      <button onClick={changeRecommendedFlag}>
        {
          recommendedFlag ? "おすすめ設定を非表示" : "おすすめの設定を見る"
        }
      </button>
      {
        recommendedFlag
        &&
        <>
          <p>ランダムウォークの回数: 1000, 原始多項式: x&#x00B9;&#x00B9; + x&#x2079; + 1 <span>  </span>
          <button onClick={setRecommended1}>この値に設定する</button><br />
          ランダムウォークの回数: 2000, 原始多項式:x&#x00B9;&#x2078; + x&#x00B9;&#x00B9; + 1<span>  </span>
          <button onClick={setRecommended2}>この値に設定する</button></p>
          くらいで レジスタの初期値 などを変えてみてください
          <p style={{"color": "red"}}>(※ 大きすぎて見えないので縮小ボタンを5回くらい押してください！)</p>
        </>
      }
      <br />
      {/* <label htmlFor="interval">インターバル</label>
      <span>  </span>
      <input type="number" name="interval" value={interval} onChange={changeInterval} />
      <br /> */}
      <button onClick={generateRandClick}>シュミレーションの描画</button>
      <br />
      <br />
      <canvas id="canv" width="500" height="500"></canvas>
      {
        showingGraph
        &&
        (
          <>
            <p>乱数列 {
              randStr.length > 150
              &&
              (
                <button onClick={changeShowSize}>
                  {
                    showAll ? "Hide in middle" : "Show All"
                  }
                </button>
              )}
            </p>
            <p>
              {
                showAll ? randStr : randStr.slice(0, 150) + (randStr.length > 150 ? "..." : "")
              }
            </p>
          </>
        )
      }
      <br />
      <span>&copy; 2021 - Itsuki Mitsueda</span>
    </div>
  );
}

export default App;
