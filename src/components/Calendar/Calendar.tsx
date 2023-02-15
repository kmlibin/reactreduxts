import React from 'react';

//styles

import './Calendar.css';

const Calendar: React.FC = () => {
  return (
    <div className="calendar">
      <div className="calendar-day">
        <div className="calendar-day-label">
          <span>Feb 1</span>
        </div>
        <div className="calendar-events">
          <div className="calendar-event">
            <div className="calendar-event-info">
              <div className="calendar-event-time">10:00 - 12:00</div>
              <div className="calendar-event-title">learn ts</div>
            </div>
            <button className="calendar-event-delete">&times;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
