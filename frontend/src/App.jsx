import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch(`${API}/todos`).then(res => res.json()).then(setTodos);
  }, []);

  const add = async () => {
    const res = await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input, completed: false })
    });
    const data = await res.json();
    setTodos([...todos, data]);
    setInput('');
  };

  const del = async (id) => {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={add}>Add</button>
      <ul>
        {todos.map(t => (
          <li key={t._id}>
            {t.text} <button onClick={() => del(t._id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}