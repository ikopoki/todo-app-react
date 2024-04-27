/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { formatDistanceToNow } from 'date-fns'
import { useState, useEffect } from 'react'

function Task({ min, sec, label, onDeleted, onToggleDone, done, created, id, onTimerFilter }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState('')
  const [minutes, setMinutes] = useState(min)
  const [seconds, setSeconds] = useState(sec)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isChecked, setIsChecked] = useState(done)
  console.log(min)
  let timer

  useEffect(() => {
    if (isPlaying) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timer = setInterval(() => {
        setSeconds(seconds - 1)
        if (seconds <= 0) {
          setSeconds(59)
          setMinutes((prev) => prev - 1)
        }
      }, 1000)
    } else {
      clearInterval(timer)
    }
    if (minutes === 0 && seconds === 0) {
      clearInterval(timer)
      setMinutes(0)
      setSeconds(0)
    }
    if (done) {
      clearInterval(timer)
    }
    return () => {
      onTimerFilter(id, minutes, seconds)
      clearInterval(timer)
    }
  }, [isPlaying, done, minutes, seconds])

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

  const play = () => {
    setIsPlaying(true)
  }

  const stop = () => {
    setIsPlaying(false)
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
            <button className="icon icon-play" type="button" onClick={play} />
            <button className="icon icon-pause" type="button" onClick={stop} />
            {minutes}:{seconds}
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
          defaultValue={editedDescription}
          onChange={handleInputChange}
          onKeyPress={handleEnterPress}
        />
      )}
    </li>
  )
}

export default Task
