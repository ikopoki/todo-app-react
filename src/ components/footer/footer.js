// eslint-disable-next-line prettier/prettier, import/namespace, import/default, import/no-named-as-default, import/no-named-as-default-member
import TasksFilter from '../tasks-filter/tasks-filter'
// eslint-disable-next-line prettier/prettier
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
    // eslint-disable-next-line prettier/prettier
  )
  // eslint-disable-next-line prettier/prettier
}

// eslint-disable-next-line prettier/prettier
export default Footer
