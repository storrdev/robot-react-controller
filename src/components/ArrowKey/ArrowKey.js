import React, { Component } from 'react';

import ArrowDown from './arrow-down.svg';
import ArrowLeft from './arrow-left.svg';
import ArrowRight from './arrow-right.svg';
import ArrowUp from './arrow-up.svg';

import './ArrowKey.scss';

class ArrowKey extends Component {
  constructor(props) {
    super(props);

    this.getArrowIcon = this.getArrowIcon.bind(this);
  }

  getArrowIcon() {
    switch (this.props.direction) {
      case 'up':
        return ArrowUp;
      case 'down':
        return ArrowDown;
      case 'left':
        return ArrowLeft;
      case 'right':
        return ArrowRight;
      default:
        return null;
    }
  }

  render() {
    const { direction, pressed } = this.props;

    const classes = ['arrow-key'];

    if (direction === 'up') {
      classes.push('up');
    }

    if (pressed) {
      classes.push('pressed');
    }

    return (
      <div className={classes.join(' ')}>
        <img src={this.getArrowIcon()} alt={direction} />
      </div>
    );
  }
}

export default ArrowKey;