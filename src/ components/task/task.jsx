/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

function Task({ label, formatTime, onDeleted, onToggleDone, done, created, id, startTimer, stopTimer }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState('')
  const [isChecked, setIsChecked] = useState(done)

  // useEffect(() => {

  //   if (min === 0 && sec === 0) {
  //     stopTimer(id)
  //   }

  //   if (done) stopTimer(id)
  // }, [done, id, min, sec, stopTimer])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleInputChange = (e) => {
    setEditedDescription(e.target.value)
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
    }
  }

  const timeAgo = formatDistanceToNow(new Date(created), { addSuffix: true })

  return (
    // eslint-disable-next-line no-nested-ternary
    <li className={done ? 'completed' : isEditing ? 'editing' : 'active'}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={isChecked}
          onClick={onToggleDone}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label>
          <span className="title">{editedDescription || label}</span>
          <span className="description">
            <button className="icon icon-play" type="button" onClick={() => startTimer(id)} />
            <button className="icon icon-pause" type="button" onClick={() => stopTimer(id)} />
            {formatTime}
          </span>
          <span className="description">created {timeAgo}</span>
        </label>
        <button className="icon icon-edit" onClick={handleEdit} type="button" />
        <button className="icon icon-destroy" onClick={onDeleted} type="button" />
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          defaultValue={label}
          onChange={handleInputChange}
          onKeyPress={handleEnterPress}
        />
      )}
    </li>
  )
}

export default Task
