const mongoose = require('mongoose');
const taskSchema = require('../schema/task.schema');

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;

