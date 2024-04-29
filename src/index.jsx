/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-use-before-define */
/* eslint-disable eqeqeq */
import { useState, useEffect } from 'react'

import { createRoot } from 'react-dom/client'
import { format } from 'date-fns'

import AppHeader from './ components/app-header'
import NewTaskForm from './ components/new-task-form'
import TaskList from './ components/task-List'
import Footer from './ components/footer'
import './index.css'

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [selectedTab, setSelectedTab] = useState('all')

  const maxId = () => Math.random().toString(36).slice(2)

  const deleteItem = (id) => {
    setTodoData((prev) => {
      const idx = prev.findIndex((el) => el.id == id)

      return [...prev.slice(0, idx), ...prev.slice(idx + 1)]
    })
  }

  const deleteAllItem = () => {
    setTodoData((prev) => prev.filter((el) => !el.done))
  }

  const onFilterChange = (tab) => {
    setSelectedTab(tab)
  }

  const addItem = ({ label, minutes, seconds }) => {
    const newItem = {
      label,
      done: false,
      id: maxId(),
      created: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      min: minutes,
      sec: seconds,
      timer: undefined,
      formatTime: `${minutes}:${seconds}`,
      totalSeconds: minutes * 60 + seconds,
    }

    setTodoData((prev) => [...prev, newItem])
  }

  const onToggleDone = (id) => {
    setTodoData((prev) => {
      const idx = prev.findIndex((el) => el.id == id)

      const oldItem = prev[idx]
      const newItem = { ...oldItem, done: !oldItem.done }

      return [...prev.slice(0, idx), newItem, ...prev.slice(idx + 1)]
    })
  }

  function startTimer(id) {
    if (!todoData.find((el) => el.id === id).timer) {
      const newTimer = setInterval(() => {
        setTodoData((prev) => prev.map((el) => (el.id === id ? updateTaskTimer(el) : el)))
      }, 1000)

      setTodoData((prev) => prev.map((el) => (el.id === id ? { ...el, timer: newTimer } : el)))
    }
  }

  function stopTimer(id) {
    const task = todoData.find((el) => el.id === id)
    if (task && task.timer) {
      clearInterval(task.timer)
      setTodoData((prev) => prev.map((el) => (el.id === id ? { ...el, timer: undefined } : el)))
    }
  }

  function stopAllTimers() {
    todoData.forEach((el) => {
      if (el.timer) {
        clearInterval(el.timer)
      }
    })
  }

  const padZero = (value) => (String(value).length < 2 ? `0${value}` : value)

  const updateTaskTimer = (el) => {
    if (el.totalSeconds <= 0) {
      stopTimer(el.id)
      return { ...el, totalSeconds: 0 }
    }

    const minutes = Math.floor(el.totalSeconds / 60)
    const seconds = el.totalSeconds % 60
    const formatTime = `${padZero(minutes)}:${padZero(seconds)}`

    return {
      ...el,
      formatTime,
      totalSeconds: el.totalSeconds - 1,
    }
  }

  useEffect(() => {
    todoData.forEach((task) => {
      if (task.done && task.timer) {
        stopTimer(task.id)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoData])

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => stopAllTimers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let filteredTasks = todoData
  if (selectedTab === 'completed') {
    filteredTasks = todoData.filter((task) => task.done)
  } else if (selectedTab === 'active') {
    filteredTasks = todoData.filter((task) => !task.done)
  }

  const doneCount = todoData.filter((el) => el.done).length
  const todoCount = todoData.length - doneCount

  return (
    <>
      <AppHeader />
      <NewTaskForm onItemAdded={addItem} onFilterChange={onFilterChange} tab={selectedTab} />
      <TaskList
        todos={filteredTasks}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
      <Footer
        tab={selectedTab}
        todos={todoData}
        onDeletedAll={deleteAllItem}
        toDo={todoCount}
        onFilterChange={onFilterChange}
      />
    </>
  )
}

const rootHTML = document.getElementById('root')
const root = createRoot(rootHTML)
root.render(<App />)
