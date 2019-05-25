import { computed, observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import * as R from 'remeda'
import './App.css'
import { sanat } from './sanalista'

type ConnectMode = "hyphen" | "dot" | "underscore" | "space" | "camelCase"

class AppViewModel {
  private getWord = () => sanat[Math.floor(Math.random() * (1 + sanat.length))]
  @observable public numberOfWords: number = 4
  private getWords = () => R.range(0, 10)
    .map(
      () => R.range(0, this.numberOfWords)
        .map(() => this.getWord()
      )
    )
  @observable private words: string[][] = this.getWords()
  @computed public get passwords(): string[] {
    const connect = (words: string[][]) => words.map((theseWords) => {
      switch (this.connectMode) {
        default:
        case "hyphen":
          return theseWords.join('-')
        case "dot":
          return theseWords.join('.')
        case "underscore":
          return theseWords.join('_')
        case "space":
          return theseWords.join(' ')
        case "camelCase":
          return theseWords.map(word => word.charAt(0).toUpperCase() + word.substr(1)).join("")
      }
    })
    return connect(this.words)
  }
  @observable public connectMode: ConnectMode = "hyphen"

  public onNumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.numberOfWords = Number(event.target.options[event.target.selectedIndex].label)
    this.words = this.getWords()
  }

  public onModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.connectMode = event.target.options[event.target.selectedIndex].value as ConnectMode
  }

  public generateNew = () => this.words = this.getWords()
}
const appViewModel = new AppViewModel()

const copyPassword = (password: string) => {
  navigator.clipboard.writeText(password)
    .catch(err => {
      // This can happen if the user denies clipboard permissions:
      console.error('Error copying password to clipboard: ', err)
    })
}

@observer
class App extends React.Component {
  public render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns box is-paddingless has-background-info">
            <div className="column is-narrow">
              <div className="field">
                <h1 className="title is-1 has-text-light">
                  Salasanakone
                </h1>
                <label className="label is-large has-text-light">Sanojen määrä</label>
                <p className="control has-icons-left">
                  <span className="select is-large is-fullwidth">
                    <select onChange={appViewModel.onNumberChange} defaultValue="4">
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
                  </span>
                  <span className="icon is-left">
                    <i className="fas fa-sort-numeric-down" />
                  </span>
                </p>
              </div>
              <div className="field">
                <label className="label is-large has-text-light">Erotin</label>
                <p className="control has-icons-left">
                  <span className="select is-large is-fullwidth">
                    <select onChange={appViewModel.onModeChange} defaultValue="hyphen">
                      <option value="hyphen">Viiva</option>
                      <option value="dot">Piste</option>
                      <option value="underscore">Alaviiva</option>
                      <option value="space">Välilyönti</option>
                      <option value="camelCase">Iso Kirjain</option>
                    </select>
                  </span>
                  <span className="icon is-left">
                    <i className="fas fa-sliders-h" />
                  </span>
                </p>
              </div>
              <div className="control is-expanded">
                <button className="button is-success scaling-button is-fullwidth" onClick={appViewModel.generateNew}>
                  <span className="icon">
                    <i className="fas fa-sync-alt" />
                  </span>
                </button>
              </div>
            </div>
            <div className="column has-background-light">
              <div>
                {appViewModel.passwords.map((password) => {
                  return <div key={password} className="field has-addons">
                    <div className="control is-expanded">
                      <input className="input scaling-control" type="text" readOnly={true} value={password} />
                    </div>
                    <p className="control">
                      <a onClick={copyPassword.bind(copyPassword, password)} className="button scaling-button is-warning">
                        <span className="icon scaling-icon">
                          <i className="far fa-copy" />
                        </span>
                      </a>
                    </p>
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default App
