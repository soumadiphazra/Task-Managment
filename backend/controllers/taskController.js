const Task = require('../models/model/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.create({ title, description, status });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getTasks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';

        const skip = (page - 1) * limit;

        let filter = {};
        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        const tasks = await Task.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ created_at: -1 });

        const total = await Task.countDocuments(filter);

        res.json({
            tasks,
            total,
            page,
            pages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description !== undefined ? description : task.description;
        task.status = status || task.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.deleted_at = new Date();
        await task.save();

        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.markCompleted = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.status = 'completed';
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};