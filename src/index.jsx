/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
import { Component } from 'react'

import { createRoot } from 'react-dom/client'
import { format } from 'date-fns'

import AppHeader from './ components/app-header'
import NewTaskForm from './ components/new-task-form'
import TaskList from './ components/task-List'
import Footer from './ components/footer'
import './index.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoData: [],
      selectedTab: 'all',
      minutes: 0,
      seconds: 0,
    }
  }

  // eslint-disable-next-line react/sort-comp
  maxId = () => Math.random().toString(36).slice(2)

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      // eslint-disable-next-line
      const idx = todoData.findIndex((el) => el.id == id)

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  deleteAllItem = () => {
    this.setState(({ todoData }) => {
      const newArray = []
      todoData.forEach((el) => {
        if (!el.done) {
          newArray.push(el)
        }
      })

      return {
        todoData: newArray,
      }
    })
  }

  onFilterChange = (tab) => {
    this.setState({
      selectedTab: tab,
    })
  }

  addItem = (text) => {
    const newItem = {
      label: text,
      done: false,
      id: this.maxId(),
      created: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    }

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]

      return {
        todoData: newArray,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      // eslint-disable-next-line eqeqeq
      const idx = todoData.findIndex((el) => el.id == id)

      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }

      const newArray = todoData.toSpliced(idx, 1, newItem)

      return {
        todoData: newArray,
      }
    })
  }

  onTimerSubmit = (min, sec) => {
    this.setState({
      minutes: min,
      seconds: sec,
    })
  }

  render() {
    let filteredTasks = this.state.todoData
    if (this.state.selectedTab === 'completed') {
      filteredTasks = this.state.todoData.filter((task) => task.done)
    } else if (this.state.selectedTab === 'active') {
      filteredTasks = this.state.todoData.filter((task) => !task.done)
    }

    const doneCount = this.state.todoData.filter((el) => el.done).length
    const todoCount = this.state.todoData.length - doneCount
    return (
      <>
        <AppHeader />
        <NewTaskForm
          onItemAdded={this.addItem}
          onFilterChange={this.onFilterChange}
          tab={this.state.selectedTab}
          onTimerSubmit={this.onTimerSubmit}
        />
        <TaskList
          todos={filteredTasks}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          min={this.state.minutes}
          sec={this.state.seconds}
        />
        <Footer
          tab={this.state.selectedTab}
          todos={this.state.todoData}
          onDeletedAll={this.deleteAllItem}
          toDo={todoCount}
          onFilterChange={this.onFilterChange}
        />
      </>
    )
  }
}

const rootHTML = document.getElementById('root')
const root = createRoot(rootHTML)
root.render(<App />)
