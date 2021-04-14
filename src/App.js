import React, { useState, useRef, useEffect } from "react"
import TodoList from "./TodoList"
import { v4 as uuidv4 } from "uuid"

const LOCAL_STORAGE_KEY = "todoList.todos"

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const todoStored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (todoStored) setTodos(todoStored)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleToggleTodoComplete(id) {
    const newTodos = [...todos]
    const todo = newTodos.find((todo) => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    const newTodo = {
      id: uuidv4(),
      name: name,
      completed: false,
    }
    if (name === "") return
    setTodos((prevTodos) => {
      return [...prevTodos, newTodo]
    })
    todoNameRef.current.value = null
  }

  function handleTodoClear() {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList
        todos={todos}
        handleToggleTodoComplete={handleToggleTodoComplete}
      />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add todo</button>
      <button onClick={handleTodoClear}>Clear Completed</button>
      <div>{todos.filter((todo) => !todo.completed).length} left todo</div>
    </>
  )
}

export default App
