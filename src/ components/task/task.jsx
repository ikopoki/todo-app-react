/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { formatDistanceToNow } from 'date-fns'
import { Component } from 'react'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      editedDescription: '',
    }
  }

  handleEdit = () => {
    this.setState({ isEditing: true })
  }

  handleInputChange = (e) => {
    this.setState({ editedDescription: e.target.value })
  }

  handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      this.setState({ isEditing: false })
    }
  }

  render() {
    const { label, onDeleted, onToggleDone, done, created } = this.props
    const { isEditing, editedDescription } = this.state

    const timeAgo = formatDistanceToNow(new Date(created), { addSuffix: true })

    return (
      // eslint-disable-next-line no-nested-ternary
      <li className={done ? 'completed' : isEditing ? 'editing' : 'active'}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label>
            <span className="description">{editedDescription || label}</span>
            <span className="created">created {timeAgo}</span>
          </label>
          <button className="icon icon-edit" onClick={this.handleEdit} type="button" />
          <button className="icon icon-destroy" onClick={onDeleted} type="button" />
        </div>
        {isEditing && (
          <input
            type="text"
            className="edit"
            defaultValue={editedDescription}
            onChange={this.handleInputChange}
            onKeyPress={this.handleEnterPress}
          />
        )}
      </li>
    )
  }
}
