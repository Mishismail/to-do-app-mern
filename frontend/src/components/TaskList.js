import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, setTasks }) => {
    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            await axios.delete(`/api/tasks/${id}`, config);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (id, text) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const { data } = await axios.put(`/api/tasks/${id}`, { text }, config);
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === id ? data : task))
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task._id}>
                    <input
                        type="text"
                        value={task.text}
                        onChange={(e) => handleUpdate(task._id, e.target.value)}
                    />
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;