import { useState, useEffect } from 'react';
import './Head.css';

export default function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
            setInput('');
        }
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="todo-container">
            <div className="todo-wrapper">
                <h1 className="todo-title">✨ My Tasks</h1>
                
                <div className="input-section">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                        placeholder="What needs to be done?"
                        className="todo-input"
                    />
                    <button onClick={addTodo} className="add-button">
                        Add
                    </button>
                </div>

                <ul className="todo-list">
                    {todos.map((todo, index) => (
                        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            <div className="todo-content">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleComplete(todo.id)}
                                    className="todo-checkbox"
                                />
                                <span className="todo-text">{todo.text}</span>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="delete-button"
                            >
                                🗑️ Delete
                            </button>
                        </li>
                    ))}
                </ul>

                {todos.length === 0 && (
                    <div className="empty-state">
                        <p className="empty-icon">📭</p>
                        <p className="empty-title">No tasks yet!</p>
                        <p className="empty-desc">Add one to get started 🚀</p>
                    </div>
                )}

                {todos.length > 0 && (
                    <div className="task-counter">
                        {todos.filter(t => !t.completed).length} of {todos.length} tasks remaining
                    </div>
                )}
            </div>
        </div>
    );
}
