import React, { Component } from 'react';

import './StatusBox.scss';

class StatusBox extends Component {
  render() {
    const { connected } = this.props;

    return (
      <div className="status-box">
        {
          connected ? 
            <span className="connected">Connected</span>
            :
            <span className="not-connected">Not Connected</span>
        }
      </div>
    );
  }
}

export default StatusBox;