import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { LoginForm } from './components/Auth/LoginForm';
import { TaskInput } from './components/Tasks/TaskInput';
import { TaskList } from './components/Tasks/TaskList';
import { Sidebar } from './components/Sidebar/Sidebar';
import { CheckCircle } from 'lucide-react';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar />
      <div className="flex-1">
        <div className="max-w-4xl mx-auto p-6">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <h1 className="text-2xl font-bold">DoIt</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Welcome, {user?.name}</span>
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