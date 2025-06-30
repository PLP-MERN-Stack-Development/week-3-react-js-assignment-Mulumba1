import React, { useState, useEffect, useContext, createContext } from 'react';

// --- 1. Context for Theme Management ---
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); 
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- 2. Custom Hook for Local Storage ---
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });


  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

// --- 3. Reusable UI Components ---


const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
    default:
      variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};

// Card Component
const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

// Navbar Component
const Navbar = ({ onNavigate }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-900 dark:to-gray-800 p-4 shadow-md rounded-b-xl">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-white text-2xl font-bold mb-4 sm:mb-0">
          Task Management App
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button variant="secondary" onClick={() => onNavigate('home')}>Home</Button>
          <Button variant="secondary" onClick={() => onNavigate('tasks')}>Task Manager</Button>
          <Button variant="secondary" onClick={() => onNavigate('api-data')}>API Data</Button>
          <Button variant="secondary" onClick={toggleTheme} className="flex items-center space-x-2">
            {theme === 'light' ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 4a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm-4 7a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-4a1 1 0 011 1v1a1 1 0 11-2 0V9a1 1 0 011-1zm-.0A7.002 7.002 0 0013 15h1a1 1 0 010 2h-1A7.002 7.002 0 007 9V8a1 1 0 012 0v1a1 1 0 00.0-1zm1-8a7.002 7.002 0 00-6.293 3.707 1 1 0 01-1.707-1.414A9.002 9.002 0 0110 3a9 9 0 019 9c0 5.523-4.477 10-10 10S1 17.523 1 12A9.002 9.002 0 017.293 2.707 1 1 0 018.707 4.121z"></path></svg>
                <span>Light Mode</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};


// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 p-4 mt-8 rounded-t-xl shadow-inner">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Task Manager App. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

// Layout Component
const Layout = ({ children, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-inter">
      <Navbar onNavigate={onNavigate} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// --- 4. Task Management Component ---
const TaskManager = () => {
  // Use custom hook for persisting tasks
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  // Toggle task completion status
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on the current filter setting
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <Card className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Task Manager</h2>

      {/* Task Input */}
      <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <Button type="submit" variant="primary">Add Task</Button>
      </form>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No tasks found for this filter.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.01]"
            >
              <div className="flex items-center flex-grow cursor-pointer" onClick={() => toggleTask(task.id)}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded mr-3"
                />
                <span
                  className={`text-lg ${
                    task.completed ? 'line-through text-red-500 dark:text-red-400' : 'text-gray-800 dark:text-gray-100'
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <Button variant="danger" onClick={() => deleteTask(task.id)} className="ml-4">
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

// --- 5. API Integration Component ---
const ApiDataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data from JSONPlaceholder posts endpoint
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []); // Empty dependency array means this runs once on mount

  // Filtered data based on search term (case-insensitive)
  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Public API Data (JSONPlaceholder)</h2>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or body..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {loading && (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-lg text-gray-600 dark:text-gray-300">Loading data...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 dark:text-red-400 text-lg">
          Error: {error}
        </div>
      )}

      {!loading && !error && filteredData.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">No matching data found.</p>
      )}

      {!loading && !error && filteredData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((post) => (
            <Card key={post.id} className="p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">{post.title}</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">{post.body}</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">User ID: {post.userId}</p>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};

// --- 6. Home Page Component ---
const HomePage = () => {
  return (
    <Card className="max-w-4xl mx-auto text-center p-8">
      <h2 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-6 animate-fade-in-down">
        Welcome to Task Management App!
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-8 animate-fade-in">
        This application demonstrates a responsive React setup with JSX, Tailwind CSS,
        advanced component architecture, state management using hooks, and seamless API integration.
      </p>
      <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
        <Button variant="primary" className="shadow-md hover:shadow-lg transform hover:-translate-y-1 animate-bounce-in">
          Explore Features
        </Button>
        <Button variant="secondary" className="shadow-md hover:shadow-lg transform hover:-translate-y-1 animate-bounce-in delay-100">
          Learn More
        </Button>
      </div>

      <div className="mt-10 text-left">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Key Features:</h3>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-2">
          <li>Modular Component Architecture for reusability.</li>
          <li>Robust State Management using `useState` and custom hooks.</li>
          <li>Dynamic API Integration with loading and error handling.</li>
          <li>Fully Responsive Design with Tailwind CSS, adapting to any screen size.</li>
          <li>Light/Dark Theme Switching for user comfort.</li>
          <li>Tasks persistence using Local Storage.</li>
        </ul>
      </div>
    </Card>
  );
};


// --- Main App Component ---
// App: The root component of the application, handling basic "routing" and layout.
const App = () => {
  // Simple state for "routing" as react-router-dom is not directly supported in this single file context
  const [currentPage, setCurrentPage] = useState('home');

  // Function to change the current page
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Render the content based on the current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'tasks':
        return <TaskManager />;
      case 'api-data':
        return <ApiDataFetcher />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ThemeProvider>
      <Layout onNavigate={handleNavigate}>
        {renderPage()}
      </Layout>
    </ThemeProvider>
  );
};

export default App;
