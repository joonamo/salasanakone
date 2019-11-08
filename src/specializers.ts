const secureArray = new Uint32Array(1)
export const secureRandomRange = (min: number, max: number) => {
  window.crypto.getRandomValues(secureArray)
  return min + (secureArray[0] % (max - min))
}

export const capitalify = (word: string) => {
  const idx = secureRandomRange(0, word.length)
  return word.substr(0, idx) + word.charAt(idx).toLocaleUpperCase() + word.substr(idx + 1, word.length)
}

const charToNum = {
  a: "4",
  e: "3",
  i: "1",
  l: "1",
  o: "0",
  s: "5",
  t: "7",
  z: "2"
}
const numberifyableChars = Object.keys(charToNum)
export const numberify = (word: string) => {
  const numberifyableIdxs: number[] = []
  Array.from(word.toLowerCase()).forEach((c, i) => {
    if (numberifyableChars.includes(c)) {
      numberifyableIdxs.push(i)
    }
  })

  const idx = numberifyableIdxs[secureRandomRange(0, numberifyableIdxs.length)]
  return word.substr(0, idx)
    + charToNum[word.charAt(idx).toLowerCase()]
    + word.substr(idx + 1, word.length)
}

export const applyRandom = <T extends {}>(arr: T[], f: (v: T) => T) => {
  const idx = secureRandomRange(0, arr.length)
  return [...arr.slice(0, idx), f(arr[idx]), ...arr.slice(idx + 1, arr.length)]
}