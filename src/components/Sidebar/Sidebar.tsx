import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setActiveFilter } from '../../store/slices/taskSlice';
import { TaskProgress } from './TaskProgress';
import {
  ListTodo,
  Calendar,
  Star,
  Clock,
  Users,
  Plus,
} from 'lucide-react';
import profileImage from './Profile.jpg';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const activeFilter = useSelector((state: RootState) => state.tasks.activeFilter);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const importantTasks = tasks.filter(task => task.isImportant);
  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt).toDateString();
    const today = new Date().toDateString();
    return taskDate === today;
  });

  const handleFilterChange = (filter: string) => {
    dispatch(setActiveFilter(filter));
  };

  return (
    <div className="w-64 bg-gray-800 h-screen p-6 flex flex-col">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
      <img
  src="/Profile.jpg"
  alt="Profile"
  className="w-16 h-16 rounded-full mb-2 object-cover"
/>
        <h2 className="text-white text-lg font-medium">Hey, {user?.name}</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleFilterChange('all')}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-white rounded-lg hover:bg-gray-700 ${
                activeFilter === 'all' ? 'bg-gray-700' : ''
              }`}
            >
              <ListTodo className="h-5 w-5" />
              <span>All Tasks</span>
              <span className="ml-auto text-gray-400">{tasks.length}</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterChange('today')}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-white rounded-lg hover:bg-gray-700 ${
                activeFilter === 'today' ? 'bg-gray-700 text-green-500' : ''
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Today</span>
              <span className="ml-auto text-gray-400">{todayTasks.length}</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterChange('important')}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-white rounded-lg hover:bg-gray-700 ${
                activeFilter === 'important' ? 'bg-gray-700' : ''
              }`}
            >
              <Star className="h-5 w-5" />
              <span>Important</span>
              <span className="ml-auto text-gray-400">{importantTasks.length}</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterChange('planned')}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-white rounded-lg hover:bg-gray-700 ${
                activeFilter === 'planned' ? 'bg-gray-700' : ''
              }`}
            >
              <Clock className="h-5 w-5" />
              <span>Planned</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterChange('assigned')}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-white rounded-lg hover:bg-gray-700 ${
                activeFilter === 'assigned' ? 'bg-gray-700' : ''
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Assigned to me</span>
            </button>
          </li>
        </ul>

        <button
          onClick={() => handleFilterChange('all')}
          className="w-full flex items-center space-x-3 px-4 py-2 text-white rounded-lg hover:bg-gray-700 mt-4"
        >
          <Plus className="h-5 w-5" />
          <span>Add list</span>
        </button>
      </nav>

      {/* Task Progress */}
      <TaskProgress />
    </div>
  );
};