import React, { useState } from 'react';
import { Plus, Tag } from 'lucide-react';
import { Track } from '../types';

interface TracksListProps {
  tracks: Track[];
  onAddTrack: (track: Track) => void;
}

const TracksList: React.FC<TracksListProps> = ({ tracks, onAddTrack }) => {
  const [newTrackName, setNewTrackName] = useState('');
  const [newTrackColor, setNewTrackColor] = useState('#6366f1');

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTrackName.trim()) {
      onAddTrack({
        id: Date.now().toString(),
        name: newTrackName.trim(),
        color: newTrackColor,
      });
      setNewTrackName('');
      setNewTrackColor('#6366f1');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tracks</h2>
      <form onSubmit={handleAddTrack} className="mb-6">
        <div className="flex mb-3">
          <input
            type="text"
            value={newTrackName}
            onChange={(e) => setNewTrackName(e.target.value)}
            placeholder="New track name..."
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="color"
            value={newTrackColor}
            onChange={(e) => setNewTrackColor(e.target.value)}
            className="w-12 h-12 border border-gray-300"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-3 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <Plus size={24} />
          </button>
        </div>
      </form>
      <ul className="space-y-3">
        {tracks.map(track => (
          <li
            key={track.id}
            className="flex items-center p-3 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
          >
            <Tag style={{ color: track.color }} size={24} className="mr-3" />
            <span className="text-lg text-gray-800">{track.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TracksList;