import React, { Component } from "react";
import "../css/game.css";

import projectArray from "../project_list.json";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      senderEmail: "",
      message: "",
      mailSent: false,
      error: null
    };
  }

  render() {
    return <div className="app-container" />;
  }
}
