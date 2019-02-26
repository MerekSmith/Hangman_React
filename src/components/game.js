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
      answerArray: [],
      guessedLetters: [],
      answerWord: [],
      badKey: null,
      dupKey: null,
      started: false,
      playing: false,
      win: null,
      lose: null
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
    if (!this.state.playing) {
      return false;
    }

    let key = event.key.toUpperCase();
    // let badKey = null;
    const letterChoices = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    let answerArray = this.state.answerArray;
    let answerWord = this.state.answerWord;
    let guesses = this.state.guesses;
    let guessedLetters = this.state.guessedLetters;
    let wins = this.state.wins;
    let losses = this.state.losses;


    // Check if key is a letter.
    if (!letterChoices.includes(key)) {
      this.setState({
        badKey: true
      });
      return false;
    };

    // Check if key has already been guessed.
    if (guessedLetters.includes(key) || answerWord.includes(key)) {
      this.setState({
        dupKey: true
      });
      return false;
    }

    // Check if letter is in the word.
    if (answerArray.includes(key)) {
      for (let i = 0; i < answerArray.length; i++) {
        if (key === answerArray[i]) {
          answerWord[i] = key;
        }
      }
      // answerWord = answerWord.join('');
      if (!answerWord.includes("_")) {
        wins += 1;
        this.setState({
          wins,
          win: true,
          answerWord,
          playing: false
        });
        setTimeout(this.end(), 5000);
        return false;
      }
    } else {
      guesses -= 1;
      this.setState({
        guesses
      });
      if (guesses === 0) {
        // put lose message function here.
        losses += 1;
        this.setState({
          losses,
          lose: true,
          answerWord,
          playing: false
        });
        setTimeout(this.end(), 5000);
        return false;
      }
      guessedLetters.push(key);
    }



    this.setState({
      letter: key,
      badKey: null,
      dupKey: null,
      answerWord,
      guessedLetters
    })
  };


  // end = () => {
  //   console.log('win hit', this.state.win);

  //   this.setState({
  //     win: null,
  //     lose: null
  //   });

  //   this.chooseWord();


  //   console.log('win hit 2', this.state.win);

  // };


  end = () => {
    console.log('lose hit', this.state.win);
    setTimeout(() => {
      this.setState({
        win: null,
        lose: null
      });
      this.chooseWord();
    }, 3000);


    console.log('lose hit 2', this.state.win);

  };



  // Initialize random word. 
  chooseWord = () => {

    const hangmanWords = ['Disney', 'Ariel', 'Belle', 'Moana', 'Elsa', 'Anna', 'Castle', 'Princess', 'Prince', 'Mulan', 'Aurora', 'Tiana', 'Snow White', 'Cinderella', 'Repunzel', 'Princess and the Frog', 'Beauty and the Beast', 'Brave', 'Merida', 'Sleeping Beauty', 'Frozen', 'Charming', 'Jasmine', 'Aladdin', 'Tangled'];

    let word = hangmanWords[Math.floor(Math.random() * hangmanWords.length)].toUpperCase();
    let answerArray = word.split('');
    let guesses = 10;

    let blankArray = [];

    for (let i = 0; i < answerArray.length; i++) {
      if (answerArray[i] === " ") {
        blankArray[i] = " "
      } else {
        blankArray[i] = "_";
      }
    }
    console.log('answer', word);

    // let answerWord = blankArray.join("");

    this.setState({
      word,
      answerArray,
      answerWord: blankArray,
      started: true,
			playing: true,
			guesses,
      guessedLetters: []

    });
  }




  render() {
    return (
      <div className="game-container container">
        <h1>Hangman!</h1>
        {!this.state.started ?
          <button type="button" className="btn btn-success btn-lg" onClick={this.chooseWord}>Start Game</button> :
          <div>
            <div className="row user-stats">
              <div className="col-sm-2" />
              <div className="col-sm-4">
                <h2 className="stats">Wins: {this.state.wins}</h2>
              </div>
              <div className="col-sm-4">
                <h2 className="stats">Losses: {this.state.losses}</h2>
              </div>
            </div>
            <h2>Guesses Remaing: {this.state.guesses}</h2>
            <h1 className="answer-word">{this.state.answerWord.join('')}</h1>
            {this.state.win ? <h2 className="win-lose">You Won!</h2> : null}
            {this.state.lose ? <h2 className="win-lose">You Lost! Try Again!</h2> : null}
            <h2 className="guessed-letters">Guessed Letters: {this.state.guessedLetters.join(', ')}</h2>
            {this.state.badKey ? <h2>Please select a letter</h2> : null}
            {this.state.dupKey ? <h2>Please select a new letter</h2> : null}
          </div>
        }
      </div>
    )
  }
}
