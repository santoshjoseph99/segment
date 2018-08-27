import React, { Component } from 'react';
import { CheckCircleIcon } from 'evergreen-ui';
import moment from 'moment';
import './Row.css';

class Row extends Component {
  render() {
    const {item} = this.props;
    const userId = item.userId.substr(item.userId.lastIndexOf('-')+1);
    const date = moment(item.receivedAt);
    const dateStr = date.format('YYYY/MM/DD hh:mm:ss');
    return (
      <div className="row">
        <CheckCircleIcon color="blue" className="check" />
        <span className="type">{item.type}</span>
        <span className="user-id">{userId}</span>
        <span className="last">{dateStr}</span>
      </div>
    );
  }
}

export default Row;
