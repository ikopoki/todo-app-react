/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { Component } from 'react'
import './tasks-filter.css'

export default class TaskFilter extends Component {
  handleTabClick = (tab) => {
    this.props.onFilterChange(tab)
  }

  render() {
    // const { selectedTab2 } = this.state
    const { selectedTab } = this.props
    return (
      <ul className="filters">
        <li>
          <button
            className={selectedTab === 'all' ? 'selected' : ''}
            onClick={() => this.handleTabClick('all')}
            type="button"
          >
            All
          </button>
        </li>
        <li>
          <button
            className={selectedTab === 'active' ? 'selected' : ''}
            onClick={() => this.handleTabClick('active')}
            type="button"
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={selectedTab === 'completed' ? 'selected' : ''}
            onClick={() => this.handleTabClick('completed')}
            type="button"
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
