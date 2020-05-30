import React, { Component } from "react";
import "./App.css";
// import routes
import Routes from '../routes'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Routes />
      </div>
    );
  }
}

export default App;
