import React from "react"

export default function Todo({ todo, handleToggleTodoComplete }) {
  function handleClick() {
    handleToggleTodoComplete(todo.id)
  }
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleClick}
        />
        {todo.name}
      </label>
    </div>
  )
}
