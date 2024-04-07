import Task from '../task/task'
import './task-List.css'
const taskList = ({ todos, onDeleted }) => {
    const elements = todos.map((item) => {
        return (
            <Task {...item} key={item.id} onDeleted={ () => onDeleted(item.id)}/>
        )
    })
    return (
        <ul className="todo-list">
            { elements }
        </ul>
    )
}

export default taskList