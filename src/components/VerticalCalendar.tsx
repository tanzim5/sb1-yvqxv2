import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VerticalCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const VerticalCalendar: React.FC<VerticalCalendarProps> = ({ selectedDate, onSelectDate }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  const days = getDaysInMonth(selectedDate);

  const handlePrevMonth = () => {
    onSelectDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    onSelectDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePrevMonth} className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={handleNextMonth} className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center font-medium text-gray-500 text-sm">
            {day}
          </div>
        ))}
        {days.map(date => (
          <button
            key={date.toISOString()}
            onClick={() => onSelectDate(date)}
            className={`p-2 rounded-full text-sm transition-colors duration-200 ${
              date.toDateString() === selectedDate.toDateString()
                ? 'bg-indigo-600 text-white'
                : date.toDateString() === today.toDateString()
                ? 'bg-indigo-100 text-indigo-800'
                : 'hover:bg-indigo-50'
            }`}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VerticalCalendar;