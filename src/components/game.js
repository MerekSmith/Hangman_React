import React, { Component } from "react";
import "../css/game.css";

// import projectArray from "../project_list.json";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: "",
      phone: "",
      senderEmail: "",
      message: "",
      mailSent: false,
      error: null
    };
  }

  componentWillMount() {
    window.addEventListener('keyup', this.keyboardInput);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyboardInput);
  }


  keyboardInput = event => {
    console.log('event', event);
    console.log('event key', event.key);
  };


  render() {
    return (
      <div className="game-container">;
    <h1>Hangman!</h1>
        <input type="name" onKeyPress={this.handleKeyPress} />
      </div>
    )
  }
}
