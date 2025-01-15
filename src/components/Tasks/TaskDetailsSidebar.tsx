import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateTask } from '../../store/slices/taskSlice';
import { X, Bell, Calendar, RotateCw, Plus } from 'lucide-react';
import { format } from 'date-fns';

interface TaskDetailsSidebarProps {
  taskId: string;
  onClose: () => void;
}

export const TaskDetailsSidebar: React.FC<TaskDetailsSidebarProps> = ({ taskId, onClose }) => {
  const task = useSelector((state: RootState) => 
    state.tasks.tasks.find(t => t.id === taskId)
  );
  const dispatch = useDispatch();

  if (!task) return null;

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-gray-800 shadow-lg transform transition-transform ease-in-out duration-300">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">Task Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Task Title */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Title</h3>
            <p className="text-white">{task.title}</p>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-4">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
              <Plus className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
              <Calendar className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
              <RotateCw className="h-5 w-5" />
            </button>
          </div>

          {/* Due Date */}
          {task.dueDate && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Due Date</h3>
              <p className="text-white">{format(new Date(task.dueDate), 'PPP')}</p>
            </div>
          )}

          {/* Priority */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Priority</h3>
            <select
              value={task.priority}
              onChange={(e) => dispatch(updateTask({ ...task, priority: e.target.value }))}
              className="bg-gray-700 text-white rounded-md px-3 py-1 w-full"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Created Date */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Created</h3>
            <p className="text-white">{format(new Date(task.createdAt), 'PPP')}</p>
          </div>

          {/* Weather */}
          {task.weather && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Weather</h3>
              <div className="flex items-center text-white">
                <span>{task.weather.temp}°C</span>
                <span className="ml-2">{task.weather.condition}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};