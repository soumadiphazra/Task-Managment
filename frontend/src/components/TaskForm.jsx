import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './TaskList';
import Pagination from './components/Pagination';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalTasks: 0,
  });
  const [search, setSearch] = useState('');

  const fetchTasks = async (page = 1, searchTerm = search) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        params: { page, limit: 5, search: searchTerm },
      });
      setTasks(response.data.tasks);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalTasks: response.data.totalTasks,
      });
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(1);
  }, []);

  const handlePageChange = (newPage) => {
    fetchTasks(newPage, search);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearch(term);
    fetchTasks(1, term);
  };

  const addTask = async (taskData) => {
    try {
      await axios.post(`${API_URL}/tasks`, taskData);
      fetchTasks(pagination.currentPage, search);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/tasks/${id}`, updatedData);
      fetchTasks(pagination.currentPage, search);
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      fetchTasks(pagination.currentPage, search);
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const markCompleted = async (id) => {
    try {
      await axios.patch(`${API_URL}/tasks/${id}/complete`);
      fetchTasks(pagination.currentPage, search);
    } catch (err) {
      setError('Failed to mark as completed');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Manager</h1>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <TaskForm onSubmit={addTask} />
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={handleSearch}
          className="border p-2 rounded w-full md:w-64"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <TaskList
            tasks={tasks}
            onUpdate={updateTask}
            onDelete={deleteTask}
            onComplete={markCompleted}
          />
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default App;