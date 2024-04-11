import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { format } from 'date-fns';

import AppHeader from './ components/app-header';
import NewTaskForm from './ components/new-task-form';
import TaskList from './ components/task-List';
import Footer from './ components/footer';
import '../src/index.css';
export default class App extends Component {

  maxId = () => Math.random().toString(36).slice(2);

  state = {
    todoData: [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
    ],
    filteredTasks: [],
  };

  createTodoItem(label) {
    return {
      label,
      done: false,
      id: this.maxId(),
      created: Date.now(),
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      // eslint-disable-next-line
      const idx = todoData.findIndex((el) => el.id == id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  deleteAllItem = () => {
    this.setState(({ todoData }) => {
      const newArray = [];
      todoData.forEach((el) => {
        if (!el.done) {
          newArray.push(el);
        }
      });

      return {
        todoData: newArray,
      };
    });
  };

  onFilterChange = (tab) => {
    if (tab === 'completed') {
      this.setState(({ filteredTasks }) => {
        const newArray = this.state.todoData.filter((task) => task.done);

        return {
          filteredTasks: newArray,
        };
      });
    } else if (tab === 'active') {
      this.setState(({ filteredTasks }) => {
        const newArray = this.state.todoData.filter((task) => !task.done);

        return {
          filteredTasks: newArray,
        };
      });
    } else {
      this.setState(({ filteredTasks }) => {
        const copy = [...this.state.todoData];
        return {
          filteredTasks: copy,
        };
      });
    }
  };

  addItem = (text) => {
    const newItem = {
      label: text,
      done: false,
      id: this.maxId(),
      created: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    };

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      // eslint-disable-next-line eqeqeq
      const idx = todoData.findIndex((el) => el.id == id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };

      const newArray = todoData.toSpliced(idx, 1, newItem);

      return {
        todoData: newArray,
      };
    });
  };

  render() {
    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    return (
      <div>
        <AppHeader />
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList
          filters={this.state.filteredTasks}
          todos={this.state.todoData}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
        />
        <Footer
          todos={this.state.todoData}
          onDeletedAll={this.deleteAllItem.bind(this)}
          toDo={todoCount}
          onFilterChange={this.onFilterChange}
        />
      </div>
    );
  }
}

const rootHTML = document.getElementById('root');
const root = createRoot(rootHTML);
root.render(<App />);

///Users/admin/Documents/GitHub/todo-app-react/src/ components/app-header
