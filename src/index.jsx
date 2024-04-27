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
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const onTimerSubmit = (min, sec) => {
    setMinutes(min)
    setSeconds(sec)
  }

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

  const addItem = (text) => {
    const newItem = {
      label: text,
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
      <NewTaskForm
        onItemAdded={addItem}
        onFilterChange={onFilterChange}
        tab={selectedTab}
        onTimerSubmit={onTimerSubmit}
      />
      <TaskList
        todos={filteredTasks}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        onTimerFilter={onTimerFilter}
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
