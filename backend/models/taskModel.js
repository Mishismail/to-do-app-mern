const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: true,
        maxlength: 140,
    },
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;