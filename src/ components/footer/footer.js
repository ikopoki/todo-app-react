import TasksFilter from '../tasks-filter/tasks-filter'    
import  './footer.css'

const Footer = ({ toDo }) => {
    return (
        <footer className='footer'>
            <span className="todo-count">{toDo} items left</span>
            <TasksFilter />
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}

export default Footer