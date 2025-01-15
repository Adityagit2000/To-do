import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { LoginForm } from './components/Auth/LoginForm';
import { TaskInput } from './components/Tasks/TaskInput';
import { TaskList } from './components/Tasks/TaskList';
import { Sidebar } from './components/Sidebar/Sidebar';
import { CheckCircle, Moon, Sun } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleTheme } from './store/slices/themeSlice';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} flex`}>
      <Sidebar />
      <div className="flex-1">
        <div className="max-w-4xl mx-auto p-6">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <CheckCircle className={`h-8 w-8 ${isDark ? 'text-green-500' : 'text-green-600'}`} />
              <h1 className="text-2xl font-bold">DoIt</h1>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => dispatch(toggleTheme())}
                className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-gray-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
              </button>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Welcome, {user?.name}
              </span>
            </div>
          </header>
          <main>
            <TaskInput />
            <TaskList />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;