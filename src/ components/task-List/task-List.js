/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/default */
/* eslint-disable semi */
// eslint-disable-next-line prettier/prettier, import/namespace
import Task from '../task/task'
// eslint-disable-next-line prettier/prettier
import './task-List.css'
const taskList = ({ onDeleted, onToggleDone, filters }) => {
  const elements = filters.map((item) => {
    return (
      <Task
        {...item}
        key={item.id}
        onDeleted={() => onDeleted(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
      />
      // eslint-disable-next-line prettier/prettier
    )
    // eslint-disable-next-line semi
  });
  //console.log(onFilterChange())
  return <ul className="todo-list">{elements}</ul>;
};

export default taskList;
