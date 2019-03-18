import React, { Component } from "react";
import "../css/game.css";

// import projectArray from "../project_list.json";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCount: null,
      currentPlayer: null,
      word: null,
      letter: "",
      guesses: 10,
      wins: 0,
      losses: 0,
      playerTwoWins: 0,
      playerTwoLosses: 0,
      answerArray: [],
      guessedLetters: [],
      answerWord: [],
      usedWordsArray: [],
      badKey: null,
      dupKey: null,
      wordSelected: false,
      playing: false,
      win: null,
      lose: null
    };

    // end of constructor
  }

  componentWillMount() {
    window.addEventListener("keyup", this.keyboardInput);
    // this.onePlayerGame();
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.keyboardInput);
  }

  // componentDidMount() {
  //   this.onePlayerGame();
  // }

  keyboardInput = event => {
    if (!this.state.playing) {
      return false;
    }

    let key = event.key.toUpperCase();
    // let badKey = null;
    const letterChoices = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ];

    let {
      answerArray,
      answerWord,
      guesses,
      guessedLetters,
      wins,
      losses,
      playerTwoWins,
      playerTwoLosses
    } = this.state;

    // let answerArray = this.state.answerArray;
    // let answerWord = this.state.answerWord;
    // let guesses = this.state.guesses;
    // let guessedLetters = this.state.guessedLetters;
    // let wins = this.state.wins;
    // let losses = this.state.losses;
    // let playerTwoWins = this.state.playerTwoWins;
    // let playerTwoLosses = this.state.playerTwoLosses;

    // Check if key is a letter.
    if (!letterChoices.includes(key)) {
      this.setState({
        badKey: true
      });
      return false;
    }

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
        this.state.currentPlayer === "Player 1" ? wins++ : playerTwoWins++;
        this.setState({
          wins,
          playerTwoWins,
          win: true,
          answerWord,
          playing: false
        });
        this.end();
        return;
      }
    } else {
      guesses -= 1;
      this.setState({
        guesses
      });
      if (guesses === 0) {
        // lose logic here: increase lose count, set state with correct answer so it shows for a moment.
        this.state.currentPlayer === "Player 1" ? losses++ : playerTwoLosses++;
        this.setState({
          losses,
          playerTwoLosses,
          lose: true,
          answerWord: answerArray,
          playing: false
        });
        this.end();
        return;
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
    });
  };

  // Once the user guesses correctly or uses all their guesses, the correct answer will stay up for a moment then switch to a new word.
  end = () => {
    setTimeout(() => {
      this.setState({
        win: null,
        lose: null
      });
      this.state.playerCount === 1
        ? this.onePlayerGame()
        : this.twoPlayerSelection();
    }, 4000);
  };

  // Initialize random word.
  onePlayerGame = () => {
    const disneyWords = [
      "Disney",
      "Ariel",
      "Belle",
      "Moana",
      "Elsa",
      "Anna",
      "Castle",
      "Princess",
      "Prince",
      "Mulan",
      "Aurora",
      "Tiana",
      "Snow White",
      "Cinderella",
      "Repunzel",
      "Princess and the Frog",
      "Beauty and the Beast",
      "Brave",
      "Merida",
      "Sleeping Beauty",
      "Frozen",
      "Charming",
      "Jasmine",
      "Aladdin",
      "Tangled"
    ];

    const kidWords = [
      "fray",
      "gray",
      "play",
      "bake",
      "cake",
      "lake",
      "make",
      "take",
      "ate",
      "date",
      "gate",
      "mate",
      "rate",
      "age",
      "cage",
      "give",
      "gift",
      "page",
      "damp",
      "lamp",
      "stamp",
      "here",
      "there",
      "tie",
      "pie",
      "bike",
      "hike",
      "like",
      "kite",
      "cry",
      "dry",
      "fry",
      "try",
      "paw",
      "raw",
      "saw",
      "toe",
      "hoe",
      "bow",
      "low",
      "mow",
      "crow",
      "now",
      "cow",
      "bent",
      "dent",
      "tent",
      "feet",
      "beep",
      "deep",
      "jeep",
      "peep",
      "green",
      "bold",
      "cold",
      "fold",
      "hold",
      "told",
      "cone",
      "bone",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "cube",
      "tube",
      "eat",
      "heat",
      "seat",
      "dust",
      "gust",
      "must",
      "paw",
      "saw",
      "find",
      "kind",
      "mind",
      "bird",
      "duck",
      "frog",
      "doll",
      "game",
      "toy",
      "train",
      "boat",
      "plane",
      "truck",
      "ride",
      "hide",
      "wide",
      "mine",
      "ours",
      "they",
      "them",
      "bowl",
      "fork",
      "spoon",
      "home",
      "pond",
      "room",
      "neck",
      "add",
      "after",
      "again",
      "any",
      "apple",
      "arm",
      "banana",
      "bark",
      "been",
      "being",
      "bent",
      "best",
      "bone",
      "black",
      "block",
      "blue",
      "bring",
      "brown",
      "bush",
      "came",
      "cane",
      "card",
      "cart",
      "case",
      "chain",
      "chair",
      "chalk",
      "chat",
      "chin",
      "chop",
      "clam",
      "clan",
      "clap",
      "claw",
      "clay",
      "clean",
      "cool",
      "dark",
      "desk",
      "drop",
      "end",
      "family",
      "fang",
      "fast",
      "fell",
      "few",
      "fill",
      "flag",
      "flat",
      "fool",
      "foot",
      "fort",
      "free",
      "fresh",
      "from",
      "glad",
      "golf",
      "gone",
      "grit",
      "hand",
      "hang",
      "happy",
      "harm",
      "help",
      "here",
      "hide",
      "hill",
      "hint",
      "hope",
      "horn",
      "how",
      "ill",
      "into",
      "jaw",
      "joke",
      "just",
      "keep",
      "king",
      "last",
      "line",
      "look",
      "luck",
      "made",
      "many",
      "meal",
      "must",
      "nice",
      "new",
      "next",
      "odd",
      "put",
      "quit",
      "rang",
      "space",
      "said",
      "time",
      "was",
      "yard",
      "yarn",
      "baseball",
      "brother",
      "can’t",
      "clover",
      "cloud",
      "crayon",
      "club",
      "coat",
      "come",
      "cookie",
      "could",
      "crow",
      "cube",
      "cupcake",
      "deal",
      "dew",
      "didn’t",
      "dime",
      "dine",
      "dirt",
      "doll",
      "don’t",
      "door",
      "draw",
      "dream",
      "dress",
      "drink",
      "dull",
      "each",
      "east",
      "easy",
      "eight",
      "eleven",
      "every",
      "father",
      "field",
      "fine",
      "first",
      "flew",
      "flower",
      "friend",
      "globe",
      "going",
      "grape",
      "grass",
      "grew",
      "heavy",
      "I’m",
      "it’s",
      "know",
      "marker",
      "maybe",
      "milk",
      "morning",
      "mother",
      "myself",
      "much",
      "never",
      "notebook",
      "other",
      "over",
      "paper",
      "pencil",
      "pretty",
      "rabbit",
      "school",
      "seven",
      "sew",
      "shirt",
      "sister",
      "smell",
      "stray",
      "string",
      "summer",
      "start",
      "swing",
      "table",
      "thank",
      "thrift",
      "twelve",
      "twist",
      "under",
      "very",
      "water",
      "were",
      "where",
      "won’t",
      "yellow",
      "zebra",
      "zero",
      "always",
      "animal",
      "around",
      "because",
      "before",
      "believe",
      "between",
      "bread",
      "bright",
      "busy",
      "cannot",
      "caught",
      "charge",
      "clapped",
      "clean",
      "chicken",
      "children",
      "doctor",
      "does",
      "goes",
      "everyone",
      "everywhere",
      "flight",
      "inside",
      "juice",
      "kitchen",
      "laughter",
      "lunchroom",
      "nobody",
      "once",
      "orange",
      "outside",
      "piece",
      "purple",
      "raise",
      "round",
      "shoes",
      "today",
      "used",
      "weak",
      "week",
      "whale",
      "which",
      "while",
      "wool",
      "yesterday"
    ];

    let usedWordsArray = this.state.usedWordsArray;
    let word = "";

    function checkDup() {
      word = kidWords[
        Math.floor(Math.random() * kidWords.length)
      ].toUpperCase();

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
    let answerArray = word.split("");
    let guesses = 10;

    let blankArray = [];

    for (let i = 0; i < answerArray.length; i++) {
      if (answerArray[i] === " ") {
        blankArray[i] = " ";
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
      wordSelected: true,
      playing: true,
      playerCount: 1,
      currentPlayer: "Player 1"
    });
  };

  twoPlayerSelection = () => {
    console.log("2 player selection");
    let currentPlayer =
      !this.state.currentPlayer || this.state.currentPlayer === "Player 2"
        ? "Player 1"
        : "Player 2";
    this.setState({
      playerCount: 2,
      word: "",
      wordSelected: false,
      currentPlayer
    });
  };

  // Initialize two player game where it takes in a user inputted word.
  twoPlayerGame = e => {
    console.log("2 player game hit");
    e.preventDefault();

    let word = this.state.word.toUpperCase();

    let answerArray = word.split("");
    let guesses = 10;

    let blankArray = [];

    for (let i = 0; i < answerArray.length; i++) {
      if (answerArray[i] === " ") {
        blankArray[i] = " ";
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
      playing: true,
      wordSelected: true
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("change");
  };

  render() {
    return (
      <div className='game-container container'>
        <h1>Hangman!</h1>
        {!this.state.playerCount ? ( //change to check player count?
          <div>
            <h2>Choose How You Want to Play:</h2>
            <div>
              <button
                type='button'
                className='btn btn-success btn-lg mb-3'
                onClick={this.onePlayerGame}
              >
                1 Player
              </button>
              {/* make player count of 1 update variable that then takes in input for 1 player */}
            </div>
            <div>
              <button
                type='button'
                className='btn btn-success btn-lg'
                onClick={this.twoPlayerSelection}
              >
                2 Player
              </button>
            </div>
          </div>
        ) : null}

        {/* Two Player word input */}
        {this.state.playerCount === 2 && !this.state.wordSelected ? (
          <div>
            <h2>{this.state.currentPlayer}, Enter Your Word</h2>
            <form onSubmit={this.twoPlayerGame}>
              <div className='form-group'>
                {/* <label htmlFor="userInputWord">User Word:</label> */}
                <input
                  name='word'
                  type='text'
                  className='form control form-control-lg'
                  id='userInput'
                  placeholder='Enter Word Here'
                  required='required'
                  data-error='Word is required.'
                  onChange={e => this.setState({ word: e.target.value })}
                  value={this.state.word}
                />
              </div>
              <button type='submit' className='btn btn-lg btn-success'>
                Submit
              </button>
            </form>
          </div>
        ) : null}

        {this.state.playing || this.state.wordSelected ? (
          <div>
            <h2>{this.state.currentPlayer}'s Turn</h2>
            <div className='row user-stats'>
              <div className='col-sm-2' />
              <div className='col-sm-4'>
                <h2 className='stats'>
                  Wins:{" "}
                  {this.state.currentPlayer === "Player 1"
                    ? this.state.wins
                    : this.state.playerTwoWins}
                </h2>
              </div>
              <div className='col-sm-4'>
                <h2 className='stats'>
                  Losses:{" "}
                  {this.state.currentPlayer === "Player 1"
                    ? this.state.losses
                    : this.state.playerTwoLosses}
                </h2>
              </div>
            </div>
            <h2>Guesses Remaining: {this.state.guesses}</h2>
            <h1 className='answer-word'>{this.state.answerWord.join("")}</h1>
            {this.state.win ? <h2 className='win-lose'>You Won!</h2> : null}
            {this.state.lose ? (
              <h2 className='win-lose'>You Lost! Try Again!</h2>
            ) : null}
            <h2 className='guessed-letters'>
              Guessed Letters: {this.state.guessedLetters.join(", ")}
            </h2>
            {this.state.badKey ? <h2>Please select a letter</h2> : null}
            {this.state.dupKey ? <h2>Please select a new letter</h2> : null}
          </div>
        ) : null}
      </div>
    );
  }
}
