import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleTask, deleteTask, updateTaskPriority, toggleImportant } from '../../store/slices/taskSlice';
import { Star, Trash2, Cloud, X, Bell, Calendar, RotateCw } from 'lucide-react';
import { format } from 'date-fns';
import { TaskDetailsSidebar } from './TaskDetailsSidebar';

export const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const activeFilter = useSelector((state: RootState) => state.tasks.activeFilter);
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

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
        return false;
      default:
        return true;
    }
  });

  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  const handleTaskClick = (taskId: string) => {
    setSelectedTask(taskId);
  };

  return (
    <div className="relative flex-1">
      <div className="space-y-4">
        {/* Pending Tasks */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white mb-4">Tasks</h2>
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task.id)}
              className={`bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors ${
                task.id === selectedTask ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => {
                      e.stopPropagation();
                      dispatch(toggleTask(task.id));
                    }}
                    className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-white">{task.title}</span>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(toggleImportant(task.id));
                    }}
                  />
                  <Trash2
                    className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteTask(task.id));
                    }}
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

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-white mb-4">Completed</h2>
            <div className="space-y-2 opacity-60">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleTaskClick(task.id)}
                  className={`bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors ${
                    task.id === selectedTask ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) => {
                          e.stopPropagation();
                          dispatch(toggleTask(task.id));
                        }}
                        className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-white line-through">{task.title}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Star
                        className={`h-5 w-5 cursor-pointer ${task.isImportant ? 'text-yellow-500' : 'text-gray-400'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(toggleImportant(task.id));
                        }}
                      />
                      <Trash2
                        className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteTask(task.id));
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Task Details Sidebar */}
      {selectedTask && (
        <TaskDetailsSidebar
          taskId={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};