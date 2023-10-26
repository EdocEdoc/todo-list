import { useState, useEffect } from 'react'
import "./styles.css"

function App() {
  const [count, setCount] = useState(0)
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEM")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    // store todos on local storage
    localStorage.setItem("ITEM", JSON.stringify(todos))
  }, [todos])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!newItem) return
    // if you want to use the current value
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {id: crypto.randomUUID(), title: newItem, completed: false}
      ]
    })

    setNewItem("")
    // this is when you need to use the last render value
    //setTodos([...todos, {id: crypto.randomUUID(), title: newItem, completed: false}])
  }

  const toggleTodo = (id, completed) => {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id == id){
          return{
            ...todo,
            completed: completed
          }
        }
         return todo
      })
    })
  }

  const deleteTodo = (id) => {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id != id)
    })
  }

  return (
    <>
    <form onSubmit={handleSubmit} className='new-item-form' >
      <div className='form-row' >
        <label htmlFor='item' >New Item</label>
        <input value={newItem} type='text' id="item" onChange={e => setNewItem(e.target.value)}/>
      </div>
      <button className='btn'>Add</button>
    </form>
    <h1 className='header'>Todo List</h1>
    <ul className='list'>
    {
      todos.map(todo => {
        return <li key={todo.id}>
        <label>
          <input type='checkbox' checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)} />
          {todo.title}
        </label>
        <button className='btn btn-danger' onClick={() => deleteTodo(todo.id)}>Delete</button>
      </li>
      })
    }
    </ul>
    </>
  )
}

export default App
