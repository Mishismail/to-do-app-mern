const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
