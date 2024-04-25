/* eslint-disable react/prop-types */
import TasksFilter from '../tasks-filter/tasks-filter'
import './footer.css'

function Footer({ toDo, onDeletedAll, onFilterChange, tab }) {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter onFilterChange={onFilterChange} selectedTab={tab} />
      <button type="button" className="clear-completed" onClick={onDeletedAll}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
