import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdate, onDelete, onComplete }) => {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks found.</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;