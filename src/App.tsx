import "./globals.css"

import * as React from "react"

import { sanat } from "./sanalista"
import {
  applyRandom,
  capitalify,
  numberify,
  secureRandomRange,
} from "./specializers"

const getWord = () => sanat[secureRandomRange(0, sanat.length)]

export const App: React.FunctionComponent = () => {
  const [numWords, setNumWords] = React.useState(4)
  const [separator, setSeparator] = React.useState("hyphen")
  const [includeNumber, setIncludeNumber] = React.useState(false)
  const [includeCapital, setIncludeCapital] = React.useState(false)
  const [words, setWords] = React.useState<string[][]>([])
  const updateWords = React.useCallback(
    () => setWords([...Array(10)].map(() => [...Array(numWords)].map(getWord))),
    [setWords]
  )
  React.useEffect(updateWords, [numWords])

  const [passwords, setPasswords] = React.useState<string[]>([])
  React.useEffect(() => {
    setPasswords(
      words.map((theseWords) => {
        theseWords = includeNumber
          ? applyRandom(theseWords, numberify)
          : theseWords
        theseWords = includeCapital
          ? applyRandom(theseWords, capitalify)
          : theseWords
        switch (separator) {
          default:
          case "hyphen":
            return theseWords.join("-")
          case "dot":
            return theseWords.join(".")
          case "underscore":
            return theseWords.join("_")
          case "space":
            return theseWords.join(" ")
          case "camelCase":
            return theseWords
              .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
              .join("")
        }
      })
    )
  }, [words, separator, includeNumber, includeCapital])

  return (
    <div className="container max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden m-8 drop-shadow-xl">
        <div className="flex-initial bg-sky-500 text-slate-50 p-4 flex-col flex gap-3">
          <h1>Salasanakone</h1>
          <label className="flex-col">
            <h2>Sanojen määrä</h2>
            <select
              className="select"
              value={String(numWords)}
              onChange={(e) => setNumWords(parseInt(e.currentTarget.value))}
            >
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </label>

          <label className="flex-col">
            <h2>Erotin</h2>
            <select
              className="select"
              value={separator}
              onChange={(e) => setSeparator(e.currentTarget.value)}
            >
              <option value="hyphen">Viiva</option>
              <option value="dot">Piste</option>
              <option value="underscore">Alaviiva</option>
              <option value="space">Välilyönti</option>
              <option value="camelCase">Iso Kirjain</option>
            </select>
          </label>

          <h2>Lisävalinnat</h2>

          <label>
            <input
              type="checkbox"
              className="input[type='checkbox'] h-6 w-6 rounded mr-3 border-none"
              checked={includeNumber}
              onChange={(e) => setIncludeNumber(e.currentTarget.checked)}
            />
            Pitää sisältää numero
          </label>

          <label>
            <input
              type="checkbox"
              className="input[type='checkbox'] h-6 w-6 rounded mr-3 border-none"
              checked={includeCapital}
              onChange={(e) => setIncludeCapital(e.currentTarget.checked)}
            />
            Pitää sisältää iso kirjain
          </label>

          <button
            onClick={updateWords}
            className="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 rounded-md text-xl py-3"
          >
            Päivitä
          </button>
        </div>
        <div className="flex-1 bg-blue-100 p-4 flex flex-col gap-2 md:gap-4">
          {passwords.map((password, i) => (
            <PasswordField key={i} value={password} />
          ))}
        </div>
      </div>
    </div>
  )
}

const copyPassword = (password: string) => {
  navigator.clipboard.writeText(password).catch((err) => {
    // This can happen if the user denies clipboard permissions:
    console.error("Error copying password to clipboard: ", err)
  })
}

const PasswordField: React.FunctionComponent<{ value: string }> = ({
  value,
}) => {
  return (
    <div className="flex flew-row w-full rounded-md overflow-hidden">
      <input
        className="input[type='text'] flex-1 p-2 text-slate-600 bg-slate-50 text-md md:text-xl lg:text-2xl"
        value={value}
        onChange={() => {}}
      />
      <button
        onClick={() => copyPassword(value)}
        className="text-slate-800 bg-yellow-400 hover:bg-amber-400 active:bg-orange-400 px-1"
      >
        kopioi
      </button>
    </div>
  )
}
