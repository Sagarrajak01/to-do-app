import { useState, useEffect } from 'react';

function App() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/todos`)
            .then(res => res.json())
            .then(data => setTodos(data));
    }, []);

    const addTodo = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: input })
        });
        const newTodo = await res.json();
        setTodos([...todos, newTodo]);
        setInput('');
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(t => <li key={t._id}>{t.task}</li>)}
            </ul>
        </div>
    );
}

export default App;