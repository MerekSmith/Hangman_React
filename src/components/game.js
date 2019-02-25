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
			answerWord: "",
			badKey: null,
			dupKey: null,
			playing: false
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
		if(!this.state.playing) {
			return false;
		}

		let key = event.key.toUpperCase();
		// let badKey = null;
		const letterChoices = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
		
		let answerArray = this.state.answerArray;
		let answerWord = this.state.answerWord.split('');
		let guesses = this.state.guesses;
		let guessedLetters = this.state.guessedLetters;
		let wins = this.state.wins;
		let losses = this.state.losses;


		// Check if key is a letter.
		if(!letterChoices.includes(key)) {
			this.setState({
				badKey: true
			});
			console.log('badKey has been set')
			return false;
		};
		
		// Check if key has already been guessed.
		if(guessedLetters.includes(key) || answerWord.includes(key)) {
			this.setState({
				dupKey: true
			});
			console.log('dupKey has been set')
			return false;
		}

		// Check if letter is in the word.
		if(answerArray.includes(key)) {
			for (let i = 0; i < answerArray.length; i++) {
				console.log('answerArray', answerArray);
				console.log('key match', key, answerArray[i], key === answerArray[i]);
				if(key === answerArray[i]) {
					answerWord[i] = key;
				} 
			}
			if(!answerWord.includes("_")) {
				wins += 1;
				this.chooseWord();
				return false;
			}
		} else {
			guesses -= 1;
			if(guesses === 0) {
				// put lose message function here.
				losses += 1;
				this.chooseWord();
				return false;
			}
			guessedLetters.push(key);
		}

		answerWord = answerWord.join('');
		console.log(guessedLetters);

    this.setState({
			letter: key,
			badKey: null,
			dupKey: null,
			answerWord,
			guesses,
			guessedLetters,
			losses,
			wins
    })
  };



  // Initialize random word. 
  chooseWord = () => {
		this.setState({
			playing: true
		});

    const hangmanWords = ['Disney', 'Ariel', 'Belle', 'Moana', 'Elsa', 'Anna', 'Castle', 'Princess', 'Prince', 'Mulan', 'Aurora', 'Tiana', 'Snow White', 'Cinderella', 'Repunzel', 'Princess and the Frog', 'Beauty and the Beast', 'Brave', 'Merida', 'Sleeping Beauty', 'Frozen', 'Charming', 'Jasmine', 'Aladdin', 'Tangled'];

    let word = hangmanWords[Math.floor(Math.random() * hangmanWords.length)].toUpperCase();
    let answerArray = word.split('');
		let guesses = this.state.guesses;
		
		let blankArray = [];

		for (let i = 0; i < answerArray.length; i++) {
			if(answerArray[i] === " ") {
				blankArray[i] = " "
			} else {
				blankArray[i] = "_";
			}
		}
		console.log('blank array', blankArray);

		let answerWord = blankArray.join("");
		console.log('answer array', answerWord);

    this.setState({
      word,
			answerArray,
			answerWord: answerWord,
			guesses,
			guessedLetters: []

    });
  }




  render() {
    return (
      <div className="game-container container">
        <h1>Hangman!</h1>
        <button type="button" className="btn btn-success" onClick={this.chooseWord}>Start Game</button>
				<div className = "row">
          <div className="col-md-2" />
					<div className="col-md-4">
						<h2 className="stats">Wins: {this.state.wins}</h2>
					</div>
					<div className="col-md-4">
						<h2 className="stats">Losses: {this.state.losses}</h2>
					</div>
          <div className="col-md-2" />
				</div>
        <h2>Guesses Remaing: {this.state.guesses}</h2>
        <h1>{this.state.word}</h1>
        <h1>{this.state.answerArray}</h1>
        <h1 className="answer-word">{this.state.answerWord}</h1>
        <h2 className="guessed-letters">Guessed Letters: {this.state.guessedLetters.join(', ')}</h2>
				{this.state.badKey ? <h2>Please select a letter</h2> : null}
				{this.state.dupKey ? <h2>Please select a new letter</h2> : null}

      </div>
    )
  }
}
