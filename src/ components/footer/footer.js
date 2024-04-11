import TasksFilter from '../tasks-filter/tasks-filter'
import './footer.css'

const Footer = ({ toDo, onDeletedAll, onFilterChange }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onDeletedAll}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
