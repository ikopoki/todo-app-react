/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */

import React, { useState } from 'react'
import './new-task-form.css'

interface NewTaskFormProps {
  onItemAdded: ({label, minutes, seconds }: {label: string, minutes: number, seconds: number}) => void
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onItemAdded }) => {
  const [label, setLabel] = useState<string>('')
  const [min, setMin] = useState<number>(0)
  const [sec, setSec] = useState<number>(0)

  const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value)
  }

  const onMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMin(parseInt(e.target.value, 10))
  }

  const onSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const secondsInput = (parseInt(e.target.value, 10))
    if(secondsInput >= 60) {
      setMin(min + Math.floor(secondsInput / 60))
      setSec(secondsInput % 60)
    } else {
      setSec(secondsInput)
    }
  }

  // eslint-disable-next-line consistent-return
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (label.trim() === '') {
      // eslint-disable-next-line no-console
      console.error('Error: input cannot be void')
      return null
    }

    onItemAdded({label, minutes: min,seconds: sec})
    setLabel('')
    setMin(0)
    setSec(0)
  }

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit(e)
    }
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onLabelChange}
        value={label}
        onKeyDown={onEnterPress}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={onMinuteChange}
        onKeyDown={onEnterPress}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={onSecondChange}
        onKeyDown={onEnterPress}
      />
    </form>
  )
}

export default NewTaskForm