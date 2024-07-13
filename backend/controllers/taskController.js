const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
});

const addTask = asyncHandler(async (req, res) => {
    const { text } = req.body;

    const task = new Task({
        user: req.user._id,
        text,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
});

const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        if (task.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized');
        }
        await Task.deleteOne({ _id: req.params.id });
        res.json({ message: 'Task removed' });
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});

const updateTask = asyncHandler(async (req, res) => {
    const { text } = req.body;

    const task = await Task.findById(req.params.id);

    if (task && task.user.toString() === req.user._id.toString()) {
        task.text = text;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});

module.exports = {
    getTasks,
    addTask,
    deleteTask,
    updateTask,
};
