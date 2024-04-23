/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import Task from '../task/task'
import './task-List.css'

const taskList = ({ todos, onDeleted, onToggleDone, min, sec }) => {
  const elements = todos.map((item) => (
    <Task
      {...item}
      key={item.id}
      onDeleted={() => onDeleted(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
      min={min}
      sec={sec}
    />
  ))
  return <ul className="todo-list">{elements}</ul>
}

export default taskList
