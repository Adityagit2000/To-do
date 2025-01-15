import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleTask, deleteTask, updateTaskPriority, toggleImportant } from '../../store/slices/taskSlice';
import { Star, Trash2, Cloud } from 'lucide-react';
import { format } from 'date-fns';

export const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const activeFilter = useSelector((state: RootState) => state.tasks.activeFilter);
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter(task => {
    switch (activeFilter) {
      case 'today':
        const taskDate = new Date(task.createdAt).toDateString();
        const today = new Date().toDateString();
        return taskDate === today;
      case 'important':
        return task.isImportant;
      case 'planned':
        return task.dueDate;
      case 'assigned':
        return false; // Implement assigned tasks logic here
      default:
        return true;
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={`bg-gray-800 rounded-lg p-4 ${
            task.completed ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTask(task.id))}
                className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className={`text-white ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {task.weather && (
                <div className="flex items-center text-gray-400">
                  <Cloud className="h-5 w-5 mr-1" />
                  <span>{task.weather.temp}°C</span>
                </div>
              )}
              <Star
                className={`h-5 w-5 cursor-pointer ${task.isImportant ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => dispatch(toggleImportant(task.id))}
              />
              <Trash2
                className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={() => dispatch(deleteTask(task.id))}
              />
            </div>
          </div>
          {task.dueDate && (
            <div className="mt-2 text-sm text-gray-400">
              Due: {format(new Date(task.dueDate), 'PPP')}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};