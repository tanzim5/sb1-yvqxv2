import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Tag } from 'lucide-react';
import { Task, Track } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Task) => void;
  selectedDate: Date;
  tracks: Track[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onAddTask, selectedDate, tracks }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTrack, setNewTaskTrack] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      onAddTask({
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
        date: selectedDate,
        track: newTaskTrack,
      });
      setNewTaskTitle('');
      setNewTaskTrack('');
    }
  };

  const filteredTasks = tasks.filter(
    task => task.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tasks for {selectedDate.toLocaleDateString()}</h2>
      <form onSubmit={handleAddTask} className="mb-6 space-y-3">
        <div className="flex">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-3 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <Plus size={24} />
          </button>
        </div>
        <select
          value={newTaskTrack}
          onChange={(e) => setNewTaskTrack(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select a track</option>
          {tracks.map(track => (
            <option key={track.id} value={track.name}>{track.name}</option>
          ))}
        </select>
      </form>
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks for this day. Add one to get started!</p>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map(task => (
            <li
              key={task.id}
              className="flex items-center p-3 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
            >
              <button
                onClick={() => onToggleTask(task.id)}
                className="mr-3 text-indigo-600 hover:text-indigo-800 focus:outline-none transition-colors duration-200"
              >
                {task.completed ? <CheckSquare size={24} /> : <Square size={24} />}
              </button>
              <span className={`text-lg flex-grow ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
              </span>
              {task.track && (
                <Tag 
                  size={20} 
                  className="ml-2" 
                  style={{ color: tracks.find(t => t.name === task.track)?.color }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;