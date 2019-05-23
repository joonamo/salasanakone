import * as React from 'react';
import './App.css';
import {sanat} from './sanalista'

const getWord = () => 
  sanat[Math.floor(Math.random() * (1 + sanat.length))]

class App extends React.Component {
  public render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-1">Salasanakone</h1>
          <div className="box">
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
            <p>{`${getWord()}-${getWord()}-${getWord()}-${getWord()}`}</p>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
