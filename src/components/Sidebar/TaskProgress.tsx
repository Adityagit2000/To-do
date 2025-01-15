import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const TaskProgress = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt).toDateString();
    const today = new Date().toDateString();
    return taskDate === today;
  });

  const completedTasks = todayTasks.filter(task => task.completed);
  const totalTasks = todayTasks.length;
  const completionPercentage = totalTasks ? (completedTasks.length / totalTasks) * 100 : 0;

  // SVG parameters for pie chart
  const size = 160;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-400">Today Tasks</h3>
        <span className="text-2xl font-bold text-white">{totalTasks}</span>
      </div>
      <div className="relative w-40 h-40 mx-auto">
        <svg className="transform -rotate-90 w-40 h-40">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-gray-700"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-green-500"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="flex justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-700 mr-2"></div>
          <span className="text-gray-400">Pending</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-gray-400">Done</span>
        </div>
      </div>
    </div>
  );
};