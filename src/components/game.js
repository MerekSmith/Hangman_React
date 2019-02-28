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
      usedWordsArray: [],
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
			// Win logic: increase win count and set state.
      if (!answerWord.includes("_")) {
        wins += 1;
        this.setState({
          wins,
          win: true,
          answerWord,
          playing: false
        });
        this.end();
        return false;
      }
    } else {
      guesses -= 1;
      this.setState({
        guesses
      });
      if (guesses === 0) {
        // lose logic here: increase lose count, set state with correct answer so it shows for a moment.
				losses += 1;
        this.setState({
          losses,
          lose: true,
          answerWord: answerArray,
          playing: false
        });
        this.end();
        return false;
      }
      guessedLetters.push(key);
    }

		// if game is still going (no win or loss), set state and continue playing
    this.setState({
      letter: key,
      badKey: null,
      dupKey: null,
      answerWord,
      guessedLetters
    })
  };


	// Once the user guesses correctly or uses all their guesses, the correct answer will stay up for a moment then switch to a new word.
  end = () => {
    setTimeout(() => {
      this.setState({
        win: null,
        lose: null
      });
      this.chooseWord();
    }, 4000);

  };



  // Initialize random word. 
  chooseWord = () => {

    const disneyWords = ['Disney', 'Ariel', 'Belle', 'Moana', 'Elsa', 'Anna', 'Castle', 'Princess', 'Prince', 'Mulan', 'Aurora', 'Tiana', 'Snow White', 'Cinderella', 'Repunzel', 'Princess and the Frog', 'Beauty and the Beast', 'Brave', 'Merida', 'Sleeping Beauty', 'Frozen', 'Charming', 'Jasmine', 'Aladdin', 'Tangled'];

    const kidWords = ['fray', 'gray', 'play', 'bake', 'cake', 'lake', 'make', 'take', 'ate', 'date', 'gate', 'mate', 'rate', 'age', 'cage', 'give', 'gift', 'page', 'damp', 'lamp', 'stamp', 'here', 'there', 'tie', 'pie', 'bike', 'hike', 'like', 'kite', 'cry', 'dry', 'fry', 'try', 'paw', 'raw', 'saw', 'toe', 'hoe', 'bow', 'low', 'mow', 'crow', 'now', 'cow', 'bent', 'dent', 'tent', 'feet', 'beep', 'deep', 'jeep', 'peep', 'green', 'bold', 'cold', 'fold', 'hold', 'told', 'cone', 'bone', 'one', 'two', 'three', 'four', 'five', 'six', 'cube', 'tube', 'eat', 'heat', 'seat', 'dust', 'gust', 'must', 'paw', 'saw', 'find', 'kind', 'mind', 'bird', 'duck', 'frog', 'doll', 'game', 'toy', 'train', 'boat', 'plane', 'truck', 'ride', 'hide', 'wide', 'mine', 'ours', 'they', 'them', 'bowl', 'fork', 'spoon', 'home', 'pond', 'room', 'neck', 'add', 'after', 'again', 'any', 'apple', 'arm', 'banana', 'bark', 'been', 'being', 'bent', 'best', 'bone', 'black', 'block', 'blue', 'bring', 'brown', 'bush', 'came', 'cane', 'card', 'cart', 'case', 'chain', 'chair', 'chalk', 'chat', 'chin', 'chop', 'clam', 'clan', 'clap', 'claw', 'clay', 'clean', 'cool', 'dark', 'desk', 'drop', 'end', 'family', 'fang', 'fast', 'fell', 'few', 'fill', 'flag', 'flat', 'fool', 'foot', 'fort', 'free', 'fresh', 'from', 'glad', 'golf', 'gone', 'grit', 'hand', 'hang', 'happy', 'harm', 'help', 'here', 'hide', 'hill', 'hint', 'hope', 'horn', 'how', 'ill', 'into', 'jaw', 'joke', 'just', 'keep', 'king', 'last', 'line', 'look', 'luck', 'made', 'many', 'meal', 'must', 'nice', 'new', 'next', 'odd', 'put', 'quit', 'rang', 'space', 'said', 'time', 'was', 'yard', 'yarn', 'baseball', 'brother', 'can’t', 'clover', 'cloud', 'crayon', 'club', 'coat', 'come', 'cookie', 'could', 'crow', 'cube', 'cupcake', 'deal', 'dew', 'didn’t', 'dime', 'dine', 'dirt', 'doll', 'don’t', 'door', 'draw', 'dream', 'dress', 'drink', 'dull', 'each', 'east', 'easy', 'eight', 'eleven', 'every', 'father', 'field', 'fine', 'first', 'flew', 'flower', 'friend', 'globe', 'going', 'grape', 'grass', 'grew', 'heavy', 'I’m', 'it’s', 'know', 'marker', 'maybe', 'milk', 'morning', 'mother', 'myself', 'much', 'never', 'notebook', 'other', 'over', 'paper', 'pencil', 'pretty', 'rabbit', 'school', 'seven', 'sew', 'shirt', 'sister', 'smell', 'stray', 'string', 'summer', 'start', 'swing', 'table', 'thank', 'thrift', 'twelve', 'twist', 'under', 'very', 'water', 'were', 'where', 'won’t', 'yellow', 'zebra', 'zero', 'always', 'animal', 'around', 'because', 'before', 'believe', 'between', 'bread', 'bright', 'busy', 'cannot', 'caught', 'charge', 'clapped', 'clean', 'chicken', 'children', 'doctor', 'does', 'goes', 'everyone', 'everywhere', 'flight', 'inside', 'juice', 'kitchen', 'laughter', 'lunchroom', 'nobody', 'once', 'orange', 'outside', 'piece', 'purple', 'raise', 'round', 'shoes', 'today', 'used', 'weak', 'week', 'whale', 'which', 'while', 'wool', 'yesterday']

    let usedWordsArray = this.state.usedWordsArray;
    let word = ""

    function checkDup() {
      word = kidWords[Math.floor(Math.random() * kidWords.length)].toUpperCase();

      if (usedWordsArray.includes(word)) {
        if (usedWordsArray.length === kidWords.length) {
          usedWordsArray = [];
        } else {
          checkDup();
        }
      }
    }

    checkDup();
    usedWordsArray.push(word);
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
    // console.log('answer', word);


    this.setState({
      word,
      answerArray,
      answerWord: blankArray,
      guesses,
      guessedLetters: [],
      usedWordsArray,
      started: true,
			playing: true,
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
            <h2>Guesses Remaining: {this.state.guesses}</h2>
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
