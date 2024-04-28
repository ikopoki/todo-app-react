/* eslint-disable eqeqeq */
import { useState } from 'react'

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
    }

    setTodoData((prev) => [...prev, newItem])
  }

  const onTimerFilter = (id, min, sec) => {
    setTodoData((prev) => {
      const idx = prev.findIndex((el) => el.id == id)

      const oldItem = prev[idx]
      const newItem = { ...oldItem, min, sec }
      return [...prev.slice(0, idx), newItem, ...prev.slice(idx + 1)]
    })
  }

  const onToggleDone = (id) => {
    setTodoData((prev) => {
      const idx = prev.findIndex((el) => el.id == id)

      const oldItem = prev[idx]
      const newItem = { ...oldItem, done: !oldItem.done }

      return [...prev.slice(0, idx), newItem, ...prev.slice(idx + 1)]
    })
  }

  const unmountTimer = (id, prevMinutes, prevSeconds, mountTime) => {
    setTodoData((prev) => {
      const idx = prev.findIndex((el) => el.id === id)
      const elapsedTime = Date.now() - mountTime

      const newMinutes = prevMinutes - Math.floor(elapsedTime / 60000)
      const newSeconds = prevSeconds - Math.floor((elapsedTime % 60000) / 1000)

      const newItem = {
        ...prev[idx],
        min: newMinutes < 0 ? 0 : newMinutes,
        sec: newSeconds < 0 ? 0 : newSeconds,
      }

      return [...prev.slice(0, idx), newItem, ...prev.slice(idx + 1)]
    })
  }

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
        onTimerFilter={onTimerFilter}
        unmountTimer={unmountTimer}
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
