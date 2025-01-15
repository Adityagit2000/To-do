import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/slices/taskSlice';
import { Bell, RotateCcw, Calendar } from 'lucide-react';
import { AppDispatch } from '../../store';

export const TaskInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await dispatch(addTask({
      title: title.trim(),
      completed: false,
      priority,
      dueDate,
    }));

    setTitle('');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task"
            className="flex-1 bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex space-x-2">
            <button type="button" className="p-2 text-gray-400 hover:text-white">
              <Bell className="h-5 w-5" />
            </button>
            <button type="button" className="p-2 text-gray-400 hover:text-white">
              <RotateCcw className="h-5 w-5" />
            </button>
            <button type="button" className="p-2 text-gray-400 hover:text-white">
              <Calendar className="h-5 w-5" />
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Task
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="bg-gray-700 text-white rounded-md px-3 py-1"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-gray-700 text-white rounded-md px-3 py-1"
          />
        </div>
      </form>
    </div>
  );
};