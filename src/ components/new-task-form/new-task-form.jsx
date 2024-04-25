/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import './new-task-form.css'

function NewTaskForm({ onItemAdded, onTimerSubmit }) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinuteChange = (e) => {
    setMin(e.target.value)
  }

  const onSecondChange = (e) => {
    setSec(e.target.value)
  }

  // eslint-disable-next-line consistent-return
  const onSubmit = (e) => {
    e.preventDefault()

    if (label.trim() === '') {
      // eslint-disable-next-line no-console
      console.error('Error: input cannot be void')
      return null
    }

    onItemAdded(label)
    setLabel('')

    onTimerSubmit(min, sec)
    setMin(0)
    setSec(0)
  }

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit(e)
    }
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onLabelChange}
        value={label}
        onKeyDown={onEnterPress}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={onMinuteChange}
        onKeyDown={onEnterPress}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={onSecondChange}
        onKeyDown={onEnterPress}
      />
    </form>
  )
}

export default NewTaskForm

// export default class NewTaskForm extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       label: '',
//       min: 0,
//       sec: 0,
//     }
//   }

//   onLabelChange = (e) => {
//     this.setState({
//       label: e.target.value,
//     })
//   }

//   onMinuteChange = (e) => {
//     this.setState({
//       min: e.target.value,
//     })
//   }

//   onSecondChange = (e) => {
//     this.setState({
//       sec: e.target.value,
//     })
//   }

//   onSubmit = (e) => {
//     e.preventDefault()
//     if (this.state.label.trim() === '') {
//       // eslint-disable-next-line no-console
//       console.error('Пустое поле, иди нахуй')
//       return
//     }
//     this.props.onItemAdded(this.state.label)
//     this.setState({
//       label: '',
//     })
//     this.props.onTimerSubmit(this.state.min, this.state.sec)
//   }

//   onEnterPress = (e) => {
//     if (e.key === 'Enter') {
//       this.onSubmit(e)
//     }
//   }

//   render() {
//     return (
//       <form className="new-todo-form" onSubmit={this.onSubmit}>
//         <input
//           className="new-todo"
//           placeholder="What needs to be done?"
//           onChange={this.onLabelChange}
//           value={this.state.label}
//           onKeyDown={this.onEnterPress}
//         />
//         <input
//           className="new-todo-form__timer"
//           placeholder="Min"
//           value={this.state.min}
//           onChange={this.onMinuteChange}
//           onKeyDown={this.onEnterPress}
//         />
//         <input
//           className="new-todo-form__timer"
//           placeholder="Sec"
//           value={this.state.sec}
//           onChange={this.onSecondChange}
//           onKeyDown={this.onEnterPress}
//         />
//       </form>
//     )
//   }
// }

// 52
