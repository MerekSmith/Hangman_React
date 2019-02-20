import React, { Component } from "react";
import "../css/game.css";

// import projectArray from "../project_list.json";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: "",
      guesses: 10,
      wins: 0,
      losses: 0,
      word: "",
      wordArray: [],
      guessedLetters: []
    };







    // end of constructor
  }



  componentWillMount() {
    window.addEventListener('keyup', this.keyboardInput);
    // this.chooseWord();
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyboardInput);
  }

  // componentDidMount() {
  //   this.chooseWord();
  // }

  keyboardInput = event => {
    // console.log('event', event);
    console.log('event key', event.key.toUpperCase());
    this.setState({
      letter: event.key.toUpperCase()
    })
  };

  // Initialize random word. 
  chooseWord = () => {
    const hangmanWords = ['Disney', 'Ariel', 'Belle', 'Moana', 'Elsa', 'Anna', 'Castle', 'Princess', 'Prince', 'Mulan', 'Aurora', 'Tiana', 'Snow White', 'Cinderella', 'Repunzel', 'Princess and the Frog', 'Beauty and the Beast', 'Brave', 'Merida', 'Sleeping Beauty', 'Frozen', 'Charming', 'Jasmine', 'Aladdin', 'Tangled'];

    let word = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
    let wordArray = word.split('');
    console.log(wordArray);

    this.setState({
      word,
      wordArray
    }, console.log('1 after setstate', this.state.word));
    console.log('2 state', this.state.word);
    console.log('3 word', word);
  }




  render() {
    return (
      <div className="game-container">;
        <h1>Hangman!</h1>
        <button onClick={this.chooseWord}>start</button>
        <h1>{this.state.letter}</h1>
        <h1>{this.state.word}</h1>
        <h1>{this.state.wordArray}</h1>

      </div>
    )
  }
}
