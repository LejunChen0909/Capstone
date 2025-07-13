// TodoList.jsx - React Functional Component for managing a todo list

import { useEffect, useState } from 'react';
import '../App.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch data from APIs using Fetch API: get initial todos
  useEffect(() => {
    async function loadTodos() {
      // The project uses the JSONPlaceholder API, 
      // which returns Latin placeholder text for todo items as sample data intended for testing and demonstration.
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const json = await res.json();
      setTodos(json.map(item => ({ id: item.id, title: item.title, completed: item.completed })));
    }
    loadTodos();
  }, []);

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    const newItem = { id: Date.now(), title: newTodo, completed: false };
    setTodos(prev => [...prev, newItem]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  };

  return (
    <div className="dashboard-container">
      <h1>Todo List Page</h1>
      <div>
        {/*DOM Manipulation*/}
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
