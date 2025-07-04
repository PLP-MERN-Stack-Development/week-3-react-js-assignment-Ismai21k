import React from 'react'; // ✅ Required for JSX
import { useState } from 'react';
import {TaskManager} from './TaskManager.jsx'

// Import your components here
// import Button from './components/Button';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import TaskManager from './components/TaskManager';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <TaskManager/>
      
    </div>
  );
}

export default App; 