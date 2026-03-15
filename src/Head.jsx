import { useState, useEffect } from 'react';

export default function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    // Handle window resize for responsive layout
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: isSmallScreen ? '20px 15px' : '60px 40px',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <div style={{
                maxWidth: isSmallScreen ? '600px' : '1000px',
                margin: '0 auto',
                backgroundColor: '#fff',
                borderRadius: isSmallScreen ? '16px' : '28px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                padding: isSmallScreen ? '25px' : '60px',
                overflow: 'hidden'
            }}>
                <h1 style={{
                    fontSize: isSmallScreen ? '1.8em' : '3.5em',
                    margin: `0 0 ${isSmallScreen ? '20px' : '50px'} 0`,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textAlign: 'center',
                    letterSpacing: isSmallScreen ? '0' : '1px'
                }}>
                    ✨ My Tasks
                </h1>
                
                <div style={{
                    display: 'flex',
                    gap: isSmallScreen ? '8px' : '20px',
                    marginBottom: isSmallScreen ? '20px' : '50px',
                    flexWrap: isSmallScreen ? 'wrap' : 'nowrap'
                }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                        placeholder="What needs to be done?"
                        style={{
                            flex: 1,
                            minWidth: isSmallScreen ? '100%' : '400px',
                            padding: isSmallScreen ? '12px 14px' : '18px 24px',
                            borderRadius: isSmallScreen ? '12px' : '16px',
                            border: '2px solid #e0e0e0',
                            fontSize: isSmallScreen ? '0.95em' : '1.1em',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                    <button
                        onClick={addTodo}
                        style={{
                            padding: isSmallScreen ? '12px 20px' : '18px 40px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: isSmallScreen ? '12px' : '16px',
                            cursor: 'pointer',
                            fontSize: isSmallScreen ? '0.95em' : '1.1em',
                            fontWeight: 'bold',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                            whiteSpace: 'nowrap',
                            letterSpacing: '0.5px'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                        }}
                    >
                        Add
                    </button>
                </div>

                <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: 0,
                    display: isSmallScreen ? 'block' : 'grid',
                    gridTemplateColumns: isSmallScreen ? '1fr' : todos.length >= 3 ? 'repeat(2, 1fr)' : '1fr',
                    gap: isSmallScreen ? '10px' : '20px'
                }}>
                    {todos.map((todo, index) => (
                        <li
                            key={todo.id}
                            style={{
                                padding: isSmallScreen ? '14px' : '24px',
                                marginBottom: isSmallScreen ? '10px' : '0',
                                backgroundColor: todo.completed ? '#f5f5f5' : '#fafafa',
                                border: '2px solid ' + (todo.completed ? '#e0e0e0' : '#e8e8ff'),
                                borderRadius: isSmallScreen ? '12px' : '18px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: isSmallScreen ? '10px' : '20px',
                                transition: 'all 0.3s ease',
                                flexWrap: 'wrap',
                                animation: `slideIn 0.3s ease ${index * 0.05}s`,
                                minHeight: isSmallScreen ? 'auto' : '80px'
                            }}
                            onMouseOver={(e) => {
                                if (!isSmallScreen) {
                                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.15)';
                                    e.currentTarget.style.borderColor = '#667eea';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isSmallScreen) {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = todo.completed ? '#e0e0e0' : '#e8e8ff';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: isSmallScreen ? '12px' : '18px', flex: 1, minWidth: 0 }}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleComplete(todo.id)}
                                    style={{
                                        width: isSmallScreen ? '20px' : '24px',
                                        height: isSmallScreen ? '20px' : '24px',
                                        flexShrink: 0,
                                        cursor: 'pointer',
                                        accentColor: '#667eea'
                                    }}
                                />
                                <span
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        color: todo.completed ? '#999' : '#333',
                                        fontSize: isSmallScreen ? '0.95em' : '1.15em',
                                        fontWeight: '500',
                                        transition: 'color 0.3s ease',
                                        wordBreak: 'break-word'
                                    }}
                                >
                                    {todo.text}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                style={{
                                    padding: isSmallScreen ? '6px 10px' : '10px 16px',
                                    backgroundColor: '#ff6b6b',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: isSmallScreen ? '0.8em' : '0.9em',
                                    fontWeight: 'bold',
                                    transition: 'all 0.2s ease',
                                    flexShrink: 0,
                                    whiteSpace: 'nowrap'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = '#ff5252';
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = '#ff6b6b';
                                    e.target.style.transform = 'scale(1)';
                                }}
                            >
                                🗑️ Delete
                            </button>
                        </li>
                    ))}
                </ul>

                {todos.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: isSmallScreen ? '40px 15px' : '80px 20px',
                        color: '#999'
                    }}>
                        <p style={{ fontSize: isSmallScreen ? '2.5em' : '4em', margin: '0' }}>📭</p>
                        <p style={{ fontSize: isSmallScreen ? '1em' : '1.5em', margin: '15px 0 0 0', fontWeight: '600' }}>No tasks yet!</p>
                        <p style={{ fontSize: isSmallScreen ? '0.9em' : '1.1em', margin: '8px 0 0 0' }}>Add one to get started 🚀</p>
                    </div>
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                            whiteSpace: 'nowrap'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                        }}
                    >
                        Add
                    </button>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {todos.map((todo, index) => (
                        <li
                            key={todo.id}
                            style={{
                                padding: isSmallScreen ? '14px' : '18px',
                                marginBottom: isSmallScreen ? '10px' : '12px',
                                backgroundColor: todo.completed ? '#f5f5f5' : '#fafafa',
                                border: '2px solid ' + (todo.completed ? '#e0e0e0' : '#e8e8ff'),
                                borderRadius: '12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: isSmallScreen ? '10px' : '15px',
                                transition: 'all 0.3s ease',
                                flexWrap: 'wrap',
                                animation: `slideIn 0.3s ease ${index * 0.05}s`,
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.1)';
                                e.currentTarget.style.borderColor = '#667eea';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = todo.completed ? '#e0e0e0' : '#e8e8ff';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleComplete(todo.id)}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        flexShrink: 0,
                                        cursor: 'pointer',
                                        accentColor: '#667eea'
                                    }}
                                />
                                <span
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        color: todo.completed ? '#999' : '#333',
                                        fontSize: isSmallScreen ? '0.95em' : '1.05em',
                                        fontWeight: '500',
                                        transition: 'color 0.3s ease',
                                        wordBreak: 'break-word'
                                    }}
                                >
                                    {todo.text}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                style={{
                                    padding: isSmallScreen ? '6px 10px' : '8px 14px',
                                    backgroundColor: '#ff6b6b',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: isSmallScreen ? '0.8em' : '0.9em',
                                    fontWeight: 'bold',
                                    transition: 'all 0.2s ease',
                                    flexShrink: 0,
                                    whiteSpace: 'nowrap'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = '#ff5252';
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = '#ff6b6b';
                                    e.target.style.transform = 'scale(1)';
                                }}
                            >
                                🗑️ Delete
                            </button>
                        </li>
                    ))}
                </ul>

                {todos.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: isSmallScreen ? '40px 15px' : '60px 20px',
                        color: '#999'
                    }}>
                        <p style={{ fontSize: isSmallScreen ? '2.5em' : '3em', margin: '0' }}>📭</p>
                        <p style={{ fontSize: isSmallScreen ? '1em' : '1.2em', margin: '10px 0 0 0' }}>No tasks yet!</p>
                        <p style={{ fontSize: isSmallScreen ? '0.9em' : '0.95em', margin: '5px 0 0 0' }}>Add one to get started 🚀</p>
                    </div>
                )}

                {todos.length > 0 && (
                    <div style={{
                        marginTop: isSmallScreen ? '15px' : '20px',
                        paddingTop: isSmallScreen ? '15px' : '20px',
                        borderTop: '2px solid #e8e8ff',
                        textAlign: 'center',
                        color: '#667eea',
                        fontWeight: 'bold',
                        fontSize: isSmallScreen ? '0.95em' : '1em'
                    }}>
                        {todos.filter(t => !t.completed).length} of {todos.length} tasks remaining
                    </div>
                )}
            </div>

            <style>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
}
