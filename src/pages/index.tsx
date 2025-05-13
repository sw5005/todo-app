import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: input.trim(),
          completed: false,
        },
      ]);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // 데이터가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className={styles.container}>
      <Head>
        <title>할 일 관리 앱</title>
      </Head>
      <main className={styles.main}>
        <h1>할 일 관리 앱</h1>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="할 일을 입력하세요"
            className={styles.input}
          />
          <button className={styles.addButton} onClick={addTodo}>
            추가
          </button>
        </div>

        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
              <span className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}>{todo.title}</span>
              <button className={styles.deleteButton} onClick={() => deleteTodo(todo.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
