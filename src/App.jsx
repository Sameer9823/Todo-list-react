// App.js
import React, { useState, useEffect } from 'react';
import './index.css'; // Import Tailwind CSS

const App = () => {
  const [nightMode, setNightMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  const nightModeToggle = () => {
    setNightMode(!nightMode);
  };

  const renderList = () => {
    return (
      <ul className="todo-list ">
        {todoList.map((list, index) => (
          <div className="task" key={list.id}>
            <li className='my-2'>{`${index + 1}. ${list.title}`}</li>
            <button
              className={`button ${list.status === 'STATUS: COMPLETED' ? 'bg-green-500 px-2 rounded-sm ' : 'bg-yellow-500 px-2 rounded-sm'}`}
              onClick={() => updateMyTask(list.id, index)}
            >
              {list.status}
            </button>
            <button className="button bg-red-500 mx-4 px-1 rounded-sm" onClick={() => deleteTask(list.id)}>
              Delete
            </button>
            <button className="button bg-blue-500 px-1 rounded-sm" onClick={() => setEditId(list.id)}>
              Edit
            </button>
          </div>
        ))}
      </ul>
    );
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const task = { id: todoList.length + 1, title: newTodo, status: 'STATUS: PENDING' };
      setTodoList([...todoList, task]);
      setNewTodo('');
      setEditId(null);
    }
  };

  const updateMyTask = (index, index1) => {
    const updatedStatus =
      todoList[index].status === 'STATUS: COMPLETED' ? 'STATUS: PENDING' : 'STATUS: COMPLETED';
    todoList[index].status = updatedStatus;
    setTodoList([...todoList]);
  };

  const deleteTask = (index) => {
    const newTodoList = todoList.filter((el) => el.id !== index);
    setTodoList(newTodoList);
    setEditId(null);
  };

  const editTodo = () => {
    const newValue = document.getElementById('editInput').value;
    const newTodoList = todoList.map((el) => (editId === el.id ? { ...el, title: newValue } : el));
    setTodoList(newTodoList);
    setEditId(null);
  };

  return (
    <div className={`body ${nightMode ? 'night-mode' : ''}`}>
      <nav className="navbar flex justify-between mx-11 text-lg font-extrabold bg-slate-800 text-cyan-50 px-5 py-4">
        <h1 className="logo">To-Do App</h1>
        <button
          id="nightModeToggle"
          className={`night-mode-toggle ${
            nightMode ? 'bg-yellow-500' : 'bg-gray-500'
          } text-white px-3 py-1 rounded-md`}
          onClick={nightModeToggle}
        >
          {nightMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>

      <div className="container text-center mt-5">
        <h2 className="font-bold my-5 text-3xl">My To-Do List</h2>
        <div className="flex items-center justify-center m-4">
          <input
            type="text"
            id="newTodo"
            className="new-todo border-solid border-2 border-cyan-950 w-60 ml-7 px-3 py-1 rounded-md"
            placeholder="Add a new to-do"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            id="addTodo"
            className="add-todo mx-4 bg-stone-950 text-cyan-50 w-20 py-1 rounded-md"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        {renderList()}
        <div className=" mt-4" id="EditBox">
          <input
            className="border-solid border-2 border-gray-500 p-1"
            type="text"
            id="editInput"
          />
          <button
            className="bg-black text-white w-11 rounded-md px-2 py-1 mx-2"
            onClick={editTodo}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
