/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
// eslint-disable-next-line import/no-extraneous-dependencies
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
