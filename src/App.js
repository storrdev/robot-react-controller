import React, { Component } from 'react';

import socketWorker from './socket.worker';

import ArrowKey from './components/ArrowKey';
import StatusBox from './components/StatusBox';

import directions from './direction-translations.json';
import keys from './key-translations.json';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));

    this.state = {
      connected: false,
      upPressed: false,
      leftPressed: false,
      reversePressed: false,
      rightPressed: false
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
        case 'LEFT':
          this.setState({ leftPressed: true });
          break;
        case 'REVERSE':
          this.setState({ reversePressed: true });
          break;
        case 'RIGHT':
          this.setState({ rightPressed: true });
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
        case 'LEFT':
          this.setState({ leftPressed: false });
          break;
        case 'REVERSE':
          this.setState({ reversePressed: false });
          break;
        case 'RIGHT':
          this.setState({ rightPressed: false });
          break;
        default:
          break;
      }

      this.worker.postMessage({ command: 'keyup', data: keys[key] });
    }
  }

  handleArrowMouseDown(direction) {
    this.handleKeyDown({ key: directions[direction] });
  }

  handleArrowMouseUp(direction) {
    this.handleKeyUp({ key: directions[direction] });
  }

  render() {
    const { connected, upPressed, leftPressed, reversePressed, rightPressed } = this.state;

    return (
      <div className="App">
        <StatusBox
          connected={connected}
        />
        <div className="arrow-keys">
          <ArrowKey
            direction="up"
            pressed={upPressed}
            onMouseDown={e => this.handleArrowMouseDown('up')}
            onMouseUp={e => this.handleArrowMouseUp('up')}
          />
          <ArrowKey
            direction="left"
            pressed={leftPressed}
            onMouseDown={e => this.handleArrowMouseDown('left')}
            onMouseUp={e => this.handleArrowMouseUp('left')}
          />
          <ArrowKey
            direction="down"
            pressed={reversePressed}
            onMouseDown={e => this.handleArrowMouseDown('down')}
            onMouseUp={e => this.handleArrowMouseUp('down')}
          />
          <ArrowKey
            direction="right"
            pressed={rightPressed}
            onMouseDown={e => this.handleArrowMouseDown('right')}
            onMouseUp={e => this.handleArrowMouseUp('right')}
          />
        </div>
      </div>
    );
  }
}

export default App;
