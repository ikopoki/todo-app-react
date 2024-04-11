import Task from '../task/task'
import './task-List.css'

const taskList = ({todos, onDeleted, onToggleDone, filters }) => {
  const elements = filters.map((item) => {
    return (
      <Task
        {...item}
        key={item.id}
        onDeleted={() => onDeleted(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
      />
    )
  });
  return <ul className="todo-list">{elements}</ul>;
};

export default taskList;
