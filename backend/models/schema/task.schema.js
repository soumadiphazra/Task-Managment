const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'pending' },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});


module.exports =  taskSchema;