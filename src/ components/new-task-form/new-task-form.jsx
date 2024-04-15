/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { Component } from 'react'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.label.trim() === '') {
      // eslint-disable-next-line no-console
      console.error('Пустое поле, иди нахуй')
      return
    }
    this.props.onItemAdded(this.state.label)
    this.setState({
      label: '',
    })

    setTimeout(() => {
      this.props.onFilterChange(this.props.tab)
    }, 100)
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
      </form>
    )
  }
}

// 52
