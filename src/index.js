import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'

import AppHeader from './ components/app-header'
import NewTaskForm from './ components/new-task-form'
import TaskList from './ components/task-List'
import Footer from './ components/footer'
import '../src/index.css'
export default class App extends Component {

  state = {
    todoData: [
      {label: 'Completed task', className: 'completed', id: 1},
      {label: 'Editing task', className: 'editing', id: 2},
      {label: "Active task", id: 3}
    ]
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id == id)

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArray
      }
    })
  }

  render () {
    return (
      <div>
        <AppHeader />
        <NewTaskForm />
        <TaskList todos={this.state.todoData} onDeleted={ this.deleteItem }/>
        <Footer />
      </div>
    )
  }

  
}

const rootHTML = document.getElementById('root')
const root = createRoot(rootHTML)
root.render(<App />)