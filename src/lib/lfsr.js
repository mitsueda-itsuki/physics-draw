class LFSR {
  constructor(reg, taps) {
    this.reg = reg
    this.taps = taps.map(tap => tap - 1)
    this.digit = Math.max(...taps)
  }

  generate = size => {
    let ret = []
    for (let i = 0; i < size; i++) ret.push(this.feedback())
    return ret
  }

  feedback = () => {
    const reg = this.reg
    const taps = this.taps
    let bit = 0
    taps.forEach(tap => bit ^= 1 & (reg >> tap))
    this.reg = eval(`0b${"1".repeat(this.digit)}`) & ((reg << 1) | bit)
    return reg
  }
}

// 例
// const lfsr = new LFSR(2, [3, 2])
// lfsr.generate(25).forEach((num, index) => {
//   console.log(`${index}: ${("00000" + num.toString(2)).slice(-3)}`)
//   if (num == 1) console.log("↑ 1になった！")
// })

export const generateRand = (size, initial, primitivePolynomial) => {
  const lfsr = new LFSR(initial, primitivePolynomial)
  return lfsr.generate(size)
}
