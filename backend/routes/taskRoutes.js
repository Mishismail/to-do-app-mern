const express = require('express');
const { getTasks, addTask, deleteTask, updateTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const gmailMiddleware = require('../middleware/gmailMiddleware');
const { contentMiddleware, taskLengthMiddleware } = require('../middleware/taskMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, gmailMiddleware, getTasks)
    .post(protect, gmailMiddleware, contentMiddleware, taskLengthMiddleware, addTask);

router.route('/:id')
    .delete(protect, gmailMiddleware, deleteTask)
    .put(protect, gmailMiddleware, contentMiddleware, taskLengthMiddleware, updateTask);

module.exports = router;