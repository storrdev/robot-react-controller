import React, { Component } from 'react';

import socketWorker from './socket.worker';

import ArrowKey from './components/ArrowKey';
import StatusBox from './components/StatusBox';

import keys from './key-translations.json';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));

    this.state = {
      connected: false,
      upPressed: false
    };
  }

  componentDidMount() {
    if (window.Worker) {
      // Let's start the web worker right here
      this.worker = new socketWorker();

      // Connect to web socket server and start key listening loop
      this.worker.postMessage({ command: 'connect' });

      // Handl messages sent back from the socket worker
      this.worker.addEventListener('message', this.handleWorkerMessage.bind(this));
    }
  }

  handleWorkerMessage({ data }) {
    switch(data) {
      case 'connected':
        this.setState({ connected: true });
        break;
      case 'disconnected':
        this.setState({ connected: false });
        break;
      default:
        break;
    }
  }

  handleKeyDown({ key }) {
    if (typeof keys[key] !== 'undefined') {
      switch (keys[key]) {
        case 'FORWARD':
          this.setState({ upPressed: true });
          break;
        default:
          break;
      }

      this.worker.postMessage({ command: 'keydown', data: keys[key] });
    }
  }

  handleKeyUp({ key }) {
    if (typeof keys[key] !== 'undefined') {
      switch (keys[key]) {
        case 'FORWARD':
          this.setState({ upPressed: false });
          break;
        default:
          break;
      }

      this.worker.postMessage({ command: 'keyup', data: keys[key] });
    }
  }

  render() {
    const { connected, upPressed } = this.state;

    return (
      <div className="App">
        <StatusBox
          connected={connected}
        />
        <div className="arrow-keys">
          <ArrowKey direction="up" pressed={upPressed} />
          <ArrowKey direction="left" />
          <ArrowKey direction="down" />
          <ArrowKey direction="right" />
        </div>
      </div>
    );
  }
}

export default App;
