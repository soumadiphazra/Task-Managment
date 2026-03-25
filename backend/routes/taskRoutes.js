const express = require('express');
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  markCompleted,
} = require('../controllers/taskController');

const router = express.Router();

router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);
router.patch('/:id/complete', markCompleted);

module.exports = router;