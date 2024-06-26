import React, { useState } from 'react';
import './Calendar.css';
import Navbar from '../components/Nav';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MonthName = ({ monthIndex, year }: { monthIndex: number, year: number }) => (
  <div className="text-center text-lg font-bold mb-2 bg-kindly-offWhite text-black" style={{ padding: '8px', borderRadius: '8px' }}>
    {monthNames[monthIndex]} {year}
  </div>
);

const Calendar = ({ month, year, daysInMonth }: { month: number, year: number, daysInMonth: number }) => {
  let startingOffset = new Date(year, month, 1).getDay();

  return (
    <div className="grid grid-cols-7 gap-4">
      {[...Array(startingOffset)].map((_, index) => (
        <div key={`empty-${index}`} className="text-center text-xl text-gray-400">
          -  {/* Placeholder for empty grid items before the first day of the month */}
        </div>
      ))}
      {[...Array(daysInMonth)].map((_, index) => {
        const dayOfMonth = index + 1;
        let dayStyle = 'day-number';  // Base styling for day numbers

        if ([3, 4, 5, 6].includes(dayOfMonth)) {
          dayStyle += ' special-day streak-highlight';  // Additional styling for special days
        }

        if ([7].includes(dayOfMonth)) {
          dayStyle += ' special-day current-day-highlight';  // Additional styling for the current day
        }

        return (
          <div key={dayOfMonth} className={dayStyle}>
            {dayOfMonth}
          </div>
        );
      })}
    </div>
  );
};

const CalendarPage: React.FC = () => {
  const initialYear = new Date().getFullYear();
  const initialMonth = new Date().getMonth();

  const [currentYear, setCurrentYear] = useState(initialYear);
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  const daysInMonth = [
    31, 
    (currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0)) ? 29 : 28,
    31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <div className="flex flex-col items-center bg-kindly-offWhite text-black min-h-screen">
      <Navbar />
      <div className="flex items-center max-w-screen-sm mt-16">
        <button onClick={goToPreviousMonth} className="carousel-control left-control larger-button rounded-md bg-kindly-blue" style={{ marginRight: '8px' }}>{'<'}</button>
        <div className="carousel w-full flex justify-center items-center">
          <div className="carousel-item">
            <div className="calendar-container rounded-lg shadow-lg p-4" style={{ backgroundColor: '#D9D9D9', borderRadius: '20px', maxWidth: '800px' }}>
              <MonthName monthIndex={currentMonth} year={currentYear} />
              <div className="grid grid-cols-7 gap-4 mb-4">
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="text-center font-bold">{day}</div>
                ))}
              </div>
              <Calendar month={currentMonth} year={currentYear} daysInMonth={daysInMonth[currentMonth]} />
            </div>
          </div>
        </div>
        <button onClick={goToNextMonth} className="carousel-control right-control larger-button rounded-md bg-kindly-blue" style={{ marginLeft: '8px' }}>{'>'}</button>
      </div>
    </div>
  );
};

export default CalendarPage;
