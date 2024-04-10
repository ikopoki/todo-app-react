import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
export default class Task extends Component {
  state = {
    done: false,
  };

  render() {
    const { label, onDeleted, onToggleDone, done, created } = this.props;
    const timeAgo = formatDistanceToNow(new Date(created), { addSuffix: true });

    let classNames;

    if (done) {
      classNames = 'completed';
    }

    if (!done) {
      classNames = 'active';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label>
            <span className="description">{label}</span>
            <span className="created">created {timeAgo}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
