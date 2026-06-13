import { useState } from 'react'

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Task 1', completed: true },
    { id: 2, text: 'Task 2', completed: false },
  ])
  const [newTask, setNewTask] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return
    setTodos([...todos, { id: Date.now(), text: newTask.trim(), completed: false }])
    setNewTask('')
  }

  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleDeleteAll = () => {
    setTodos([])
  }

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>

      <form className="todo__form" onSubmit={handleAdd}>
        <div className="todo__field field">
          <label className="field__label" htmlFor="new-task">New task</label>
          <input
            className="field__input"
            id="new-task"
            placeholder=" "
            autoComplete="off"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
        <button className="button" type="submit">Add</button>
      </form>

      <form className="todo__form">
        <div className="todo__field field">
          <label className="field__label" htmlFor="search-task">Search task</label>
          <input
            className="field__input"
            id="search-task"
            placeholder=" "
            autoComplete="off"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      <div className="todo__info">
        <div className="todo__total-tasks">
          Total tasks: <span>{todos.length}</span>
        </div>
        <button
          className={'todo__delete-all-button' + (todos.length > 0 ? ' is-visible' : '')}
          type="button"
          onClick={handleDeleteAll}
        >
          Delete all
        </button>
      </div>

      <ul className="todo__list">
        {filteredTodos.map(todo => (
          <li className="todo__item todo-item" key={todo.id}>
            <input
              className="todo-item__checkbox"
              id={'task-' + todo.id}
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <label className="todo-item__label" htmlFor={'task-' + todo.id}>
              {todo.text}
            </label>
            <button
              className="todo-item__delete-button"
              aria-label="Delete"
              title="Delete"
              onClick={() => handleDelete(todo.id)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="#757575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="todo__empty-message">
        {todos.length > 0 && filteredTodos.length === 0 && 'No tasks found'}
      </div>
    </div>
  )
}

export default App
