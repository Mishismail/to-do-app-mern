import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
    const { user, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.get('/api/tasks', config);
            setTasks(data);
        };

        fetchTasks();
    }, []);

    const addTask = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post('/api/tasks', { text: newTask }, config);
        setTasks([...tasks, data]);
        setNewTask('');
    };

    const deleteTask = async (id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        await axios.delete(`/api/tasks/${id}`, config);
        setTasks(tasks.filter(task => task._id !== id));
    };

    const startEditingTask = (id, text) => {
        setEditingTaskId(id);
        setEditingTaskText(text);
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditingTaskText('');
    };

    const saveTask = async (id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.put(`/api/tasks/${id}`, { text: editingTaskText }, config);
        setTasks(tasks.map(task => (task._id === id ? data : task)));
        setEditingTaskId(null);
        setEditingTaskText('');
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    return (
        <div className="main-container">
            <div className="container">
                <div className="sidebar">
                    <div className="profile">
                        <FaUserCircle size={50} />
                        <h2>{`${user.name} ${user.surname}`}</h2>
                        <p>{user.email}</p>
                    </div>
                    <button onClick={logout}><FaSignOutAlt /> Logout</button>
                </div>
                <div className="main-content">
                    <h1>To-Do List</h1>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task"
                    />
                    <button onClick={addTask}>Add Task</button>
                    <ul className="todo-list">
                        {currentTasks.map(task => (
                            <li key={task._id}>
                                {editingTaskId === task._id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editingTaskText}
                                            onChange={(e) => setEditingTaskText(e.target.value)}
                                        />
                                        <button onClick={() => saveTask(task._id)}>Save</button>
                                        <button onClick={cancelEditing}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        {task.text}
                                        <button onClick={() => startEditingTask(task._id, task.text)}>Edit</button>
                                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="pagination">
                        {[...Array(Math.ceil(tasks.length / tasksPerPage)).keys()].map(number => (
                            <button key={number + 1} onClick={() => paginate(number + 1)}>
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;