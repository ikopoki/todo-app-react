/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import './tasks-filter.css'

function TaskFilter({ onFilterChange, selectedTab }) {
  const handleTabClick = (tab) => {
    onFilterChange(tab)
  }

  return (
    <ul className="filters">
      <li>
        <button className={selectedTab === 'all' ? 'selected' : ''} onClick={() => handleTabClick('all')} type="button">
          All
        </button>
      </li>
      <li>
        <button
          className={selectedTab === 'active' ? 'selected' : ''}
          onClick={() => handleTabClick('active')}
          type="button"
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={selectedTab === 'completed' ? 'selected' : ''}
          onClick={() => handleTabClick('completed')}
          type="button"
        >
          Completed
        </button>
      </li>
    </ul>
  )
}
export default TaskFilter
