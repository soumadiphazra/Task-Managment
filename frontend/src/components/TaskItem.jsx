import { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete, onComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleUpdate = () => {
    onUpdate(task._id, { title, description, status });
    setIsEditing(false);
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    ongoing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  if (isEditing) {
    return (
      <div className="border rounded p-4 shadow-sm bg-white">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          rows="2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="pending">Pending</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Created: {new Date(task.created_at).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Updated: {new Date(task.updated_at).toLocaleString()}
          </p>
        </div>
        <div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status]}`}>
            {task.status}
          </span>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        {task.status !== 'completed' && (
          <button
            onClick={() => onComplete(task._id)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Complete
          </button>
        )}
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;