/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { formatDistanceToNow } from 'date-fns'

function Task({ label, onDeleted, onToggleDone, done, created }) {
  const timeAgo = formatDistanceToNow(new Date(created), { addSuffix: true })

  let classNames

  if (done) {
    classNames = 'completed'
  }

  if (!done) {
    classNames = 'active'
  }
  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} />
        <label>
          <span className="description">{label}</span>
          <span className="created">created {timeAgo}</span>
        </label>
        <button className="icon icon-edit" type="button" />
        <button className="icon icon-destroy" onClick={onDeleted} type="button" />
      </div>
    </li>
  )
}

export default Task
