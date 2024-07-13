import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ setTasks }) => {
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const { data } = await axios.post('/api/tasks', { text }, config);
            setTasks((prevTasks) => [...prevTasks, data]);
            setText('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;