/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
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
      min: this.props.min,
      sec: this.props.sec,
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      let { min, sec } = this.state
      sec++
      if (sec === 60) {
        sec = 0
        min++
      }
      this.setState({ sec, min })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
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

  play = () => {
    this.timer = setInterval(() => {
      let { min, sec } = this.state
      sec++
      if (sec === 60) {
        sec = 0
        min++
      }
      this.setState({ sec, min })
    }, 1000)
  }

  stop = () => {
    clearInterval(this.timer)
  }

  render() {
    const { label, onDeleted, onToggleDone, done, created } = this.props
    const { isEditing, editedDescription, min, sec } = this.state

    const timeAgo = formatDistanceToNow(new Date(created), { addSuffix: true })

    return (
      // eslint-disable-next-line no-nested-ternary
      <li className={done ? 'completed' : isEditing ? 'editing' : 'active'}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label>
            <span className="title">{editedDescription || label}</span>
            <span className="description">
              <button className="icon icon-play" type="button" onClick={this.play} />
              <button className="icon icon-pause" type="button" onClick={this.stop} />
              {min}:{sec}
            </span>
            <span className="description">created {timeAgo}</span>
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
