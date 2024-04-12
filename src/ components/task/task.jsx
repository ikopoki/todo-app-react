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
      // В этом месте вы можете выполнить логику для сохранения нового значения описания
      // Например, передать его обработчику для сохранения изменений
    }
  }

  render() {
    const { label, onDeleted, onToggleDone, done, created } = this.props
    const { isEditing, editedDescription } = this.state

    const timeAgo = formatDistanceToNow(new Date(created), { addSuffix: true })

    let classNames

    if (done) {
      classNames = 'completed'
    }

    if (!done) {
      classNames = 'active'
    }

    if (isEditing) {
      classNames = 'editing'
    }
    return (
      <li className={classNames}>
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
