import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle, FaSignOutAlt, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
    const { user, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [alert, setAlert] = useState(null);
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
        try {
            const { data } = await axios.post('/api/tasks', { text: newTask }, config);
            setTasks([...tasks, data]);
            setNewTask('');
            setAlert({ type: 'success', message: 'Task added successfully!' });
        } catch (error) {
            setAlert({ type: 'error', message: error.response.data.message });
        }
    };

    const deleteTask = async (id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            await axios.delete(`/api/tasks/${id}`, config);
            setTasks(tasks.filter(task => task._id !== id));
            setAlert({ type: 'success', message: 'Task deleted successfully!' });
        } catch (error) {
            setAlert({ type: 'error', message: error.response.data.message });
        }
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
        try {
            const { data } = await axios.put(`/api/tasks/${id}`, { text: editingTaskText }, config);
            setTasks(tasks.map(task => (task._id === id ? data : task)));
            setEditingTaskId(null);
            setEditingTaskText('');
            setAlert({ type: 'success', message: 'Task edited successfully!' });
        } catch (error) {
            setAlert({ type: 'error', message: error.response.data.message });
        }
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
                    <button onClick={() => { logout(); setAlert({ type: 'success', message: 'Logged out successfully!' }); }}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
                <div className="main-content">
                    {alert && (
                        <div className={`alert ${alert.type}`}>
                            {alert.message}
                            <span className="closebtn" onClick={() => setAlert(null)}>&times;</span>
                        </div>
                    )}
                    <h1><b>To Do App</b></h1>
                    <div className="task-input-container">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Add a new task"
                        />
                        <button onClick={addTask}><FaPlus /> Add Task</button>
                    </div>
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
                                        <button className="save" onClick={() => saveTask(task._id)}>Save</button>
                                        <button className="cancel" onClick={cancelEditing}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <span className="task-text">{task.text}</span>
                                        <button className="edit" onClick={() => startEditingTask(task._id, task.text)}>
                                            <FaEdit /> Edit
                                        </button>
                                        <button className="delete" onClick={() => deleteTask(task._id)}>
                                            <FaTrash /> Delete
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HomePage;