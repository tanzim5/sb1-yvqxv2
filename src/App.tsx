import React, { useState, useEffect } from 'react';
import { Calendar, CheckSquare, List, LightbulbIcon, Menu } from 'lucide-react';
import VerticalCalendar from './components/VerticalCalendar';
import TaskList from './components/TaskList';
import TracksList from './components/TracksList';
import { Task, Track } from './types';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [activeTab, setActiveTab] = useState<'calendar' | 'tasks' | 'tracks'>('tasks');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Load sample data
    const sampleTasks: Task[] = [
      { id: '1', title: 'Complete project proposal', completed: false, date: new Date(), track: 'Work' },
      { id: '2', title: 'Review team performance', completed: true, date: new Date(), track: 'Work' },
      { id: '3', title: 'Prepare for client meeting', completed: false, date: new Date(Date.now() + 86400000), track: 'Work' },
      { id: '4', title: 'Update website content', completed: false, date: new Date(Date.now() + 172800000), track: 'Work' },
      { id: '5', title: 'Send follow-up emails', completed: false, date: new Date(Date.now() + 259200000), track: 'Work' },
      { id: '6', title: 'Go for a run', completed: false, date: new Date(), track: 'Health' },
      { id: '7', title: 'Read 30 pages', completed: true, date: new Date(), track: 'Personal' },
      { id: '8', title: 'Grocery shopping', completed: false, date: new Date(Date.now() + 86400000), track: 'Personal' },
      { id: '9', title: 'Plan weekend trip', completed: false, date: new Date(Date.now() + 172800000), track: 'Personal' },
      { id: '10', title: 'Learn React hooks', completed: false, date: new Date(Date.now() + 259200000), track: 'Learning' },
    ];

    const sampleTracks: Track[] = [
      { id: '1', name: 'Work', color: '#4f46e5' },
      { id: '2', name: 'Personal', color: '#16a34a' },
      { id: '3', name: 'Health', color: '#dc2626' },
      { id: '4', name: 'Learning', color: '#ca8a04' },
      { id: '5', name: 'Finance', color: '#0891b2' },
    ];

    setTasks(sampleTasks);
    setTracks(sampleTracks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('tracks', JSON.stringify(tracks));
  }, [tasks, tracks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTrack = (track: Track) => {
    setTracks([...tracks, track]);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600 flex items-center">
            <LightbulbIcon className="mr-2" />
            #todo
          </h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <button 
                  onClick={() => setActiveTab('calendar')}
                  className={`text-indigo-600 hover:text-indigo-800 transition-colors duration-200 ${activeTab === 'calendar' ? 'font-bold' : ''}`}
                >
                  <Calendar className="inline mr-2" /> Calendar
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('tasks')}
                  className={`text-indigo-600 hover:text-indigo-800 transition-colors duration-200 ${activeTab === 'tasks' ? 'font-bold' : ''}`}
                >
                  <CheckSquare className="inline mr-2" /> Tasks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('tracks')}
                  className={`text-indigo-600 hover:text-indigo-800 transition-colors duration-200 ${activeTab === 'tracks' ? 'font-bold' : ''}`}
                >
                  <List className="inline mr-2" /> Tracks
                </button>
              </li>
            </ul>
          </nav>
          <button className="md:hidden text-indigo-600" onClick={toggleMenu}>
            <Menu size={24} />
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-sm p-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => { setActiveTab('calendar'); setIsMenuOpen(false); }}
                className={`w-full text-left text-indigo-600 hover:text-indigo-800 transition-colors duration-200 ${activeTab === 'calendar' ? 'font-bold' : ''}`}
              >
                <Calendar className="inline mr-2" /> Calendar
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveTab('tasks'); setIsMenuOpen(false); }}
                className={`w-full text-left text-indigo-600 hover:text-indigo-800 transition-colors duration-200 ${activeTab === 'tasks' ? 'font-bold' : ''}`}
              >
                <CheckSquare className="inline mr-2" /> Tasks
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveTab('tracks'); setIsMenuOpen(false); }}
                className={`w-full text-left text-indigo-600 hover:text-indigo-800 transition-colors duration-200 ${activeTab === 'tracks' ? 'font-bold' : ''}`}
              >
                <List className="inline mr-2" /> Tracks
              </button>
            </li>
          </ul>
        </div>
      )}
      <main className="flex-grow container mx-auto p-8 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
        <div className={`lg:w-1/4 ${activeTab !== 'calendar' ? 'hidden lg:block' : ''}`}>
          <VerticalCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        </div>
        <div className={`lg:w-1/2 ${activeTab !== 'tasks' ? 'hidden lg:block' : ''}`}>
          <TaskList tasks={tasks} onToggleTask={toggleTask} onAddTask={addTask} selectedDate={selectedDate} tracks={tracks} />
        </div>
        <div className={`lg:w-1/4 ${activeTab !== 'tracks' ? 'hidden lg:block' : ''}`}>
          <TracksList tracks={tracks} onAddTrack={addTrack} />
        </div>
      </main>
      <footer className="bg-white shadow-sm p-4 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>Manage your tasks and ideas quickly</p>
        </div>
      </footer>
    </div>
  );
};

export default App;