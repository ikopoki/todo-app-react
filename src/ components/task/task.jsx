/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { formatDistanceToNow } from 'date-fns'
import { useState, useEffect, useRef } from 'react'

function Task({ min, sec, label, onDeleted, onToggleDone, done, created, id, onTimerFilter, unmountTimer }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState('')
  const [minutes, setMinutes] = useState(min)
  const [seconds, setSeconds] = useState(sec)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isChecked, setIsChecked] = useState(done)
  const mountTimeRef = useRef(Date.now())
  const unmountTimeRef = useRef(null)

  let timer

  useEffect(() => {
    if (isPlaying) {
      onTimerFilter(id, minutes, seconds)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timer = setTimeout(() => {
        setSeconds(seconds - 1)
        if (seconds <= 0) {
          setSeconds(59)
          setMinutes((prev) => prev - 1)
        }
      }, 1000)
    } else clearTimeout(timer)

    if (minutes === 0 && seconds === 0) {
      clearTimeout(timer)
      setMinutes(0)
      setSeconds(0)
    }

    if (done) clearTimeout(timer)

    return () => {
      unmountTimeRef.current = Date.now()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      unmountTimer(id, minutes, seconds, mountTimeRef.current, unmountTimeRef.current)
    }
  }, [isPlaying, done, minutes, seconds])

  useEffect(() => {
    if (unmountTimeRef.current !== null) {
      const elapsedTime = unmountTimeRef.current - mountTimeRef.current
      setMinutes((prev) => {
        const newMinutes = prev - Math.floor(elapsedTime / 60000)
        return newMinutes < 0 ? 0 : newMinutes
      })
      setSeconds((prev) => {
        const newSeconds = prev - Math.floor((elapsedTime % 60000) / 1000)
        return newSeconds < 0 ? 0 : newSeconds
      })
    }
  }, [unmountTimeRef, mountTimeRef])

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
            {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
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
