import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

const CalendarApp = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: '00', minutes: '00' });
  const [eventText, setEventText] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
      setEventTime({ hours: '00', minutes: '00' });
      setEventText('');
      setEventName('');
      setEventLocation('');
      setEditingEvent(null);
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleEventSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, '0')}:${eventTime.minutes.padStart(2, '0')}`,
      text: eventText,
      name: eventName,
      location: eventLocation,
    };

    let updatedEvents = [...events];

    if (editingEvent) {
      updatedEvents = updatedEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event,
      );
    } else {
      updatedEvents.push(newEvent);
    }

    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    setEvents(updatedEvents);
    setEventTime({ hours: '00', minutes: '00' });
    setEventText('');
    setEventName('');
    setEventLocation('');
    setShowEventPopup(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEventTime({
      hours: event.time.split(':')[0],
      minutes: event.time.split(':')[1],
    });
    setEventText(event.text);
    setEventName(event.name);
    setEventLocation(event.location);
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);

    setEvents(updatedEvents);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    setEventTime((prevTime) => ({ ...prevTime, [name]: value.padStart(2, '0') }));
  };

  return (
    <div className="calendar-app">
      <div className="header">
        <h1 className="heading">
          Calendar
          <lord-icon
            src="https://cdn.lordicon.com/lzgqzxrq.json"
            trigger="loop"
            state="loop-oscillate"
            colors="primary:#3a3347,secondary:#ebe6ef,tertiary:#ee66aa,quaternary:#a866ee"
            style={{ width: '70px', height: '70px', marginLeft: '10px', verticalAlign: 'middle' }}
          ></lord-icon>
        </h1>
      </div>
      <div className="content">
        <div className="calendar">
          <div className="navigate-date">
            <button onClick={prevMonth} className="button">
              <ChevronLeftIcon />
            </button>
            <h2 className="month">{monthsOfYear[currentMonth]},</h2>
            <h2 className="year">{currentYear}</h2>
            <button onClick={nextMonth} className="button">
              <ChevronRightIcon />
            </button>
          </div>
          <div className="weekdays">
            {daysOfWeek.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="days">
            {[...Array(firstDayOfMonth).keys()].map((_, index) => (
              <span key={`empty-${index}`} />
            ))}
            {[...Array(daysInMonth).keys()].map((day) => (
              <span
                key={day + 1}
                className={
                  day + 1 === currentDate.getDate() &&
                  currentMonth === currentDate.getMonth() &&
                  currentYear === currentDate.getFullYear()
                    ? 'current-day'
                    : ''
                }
                onClick={() => handleDayClick(day + 1)}
              >
                {day + 1}
              </span>
            ))}
          </div>
        </div>
        <div className="upcoming-events">
          <h2>Scheduled Events</h2>
          {events.map((event, index) => (
            <div className="upcoming-event" key={index}>
              <button className="delete-event" onClick={() => handleDeleteEvent(event.id)}>
                <CloseSharpIcon />
              </button>
              <div className="event-date-wrapper">
                <div className="upcoming-event-date">{`${monthsOfYear[new Date(event.date).getMonth()]} ${new Date(event.date).getDate()}, ${new Date(event.date).getFullYear()}`}</div>
                <div className="upcoming-event-time">{event.time}</div>
              </div>
              <div className="upcoming-event-name">{event.name}</div>
              <div className="upcoming-event-location">{event.location}</div>
              <div className="upcoming-event-text">{event.text}</div>
            </div>
          ))}
        </div>
      </div>
      {showEventPopup && (
        <div className="event-popup">
          <div className="time-input">
            <div className="event-popup-time">Time</div>
            <input
              type="number"
              name="hours"
              min={0}
              max={24}
              className="hours"
              value={eventTime.hours}
              onChange={handleTimeChange}
            />
            <input
              type="number"
              name="minutes"
              min={0}
              max={60}
              className="minutes"
              value={eventTime.minutes}
              onChange={handleTimeChange}
            />
          </div>
          <input
            type="text"
            placeholder="Enter Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Event Location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
          <textarea
            placeholder="Enter Event Description (Maximum 60 Characters)"
            value={eventText}
            onChange={(e) => {
              if (e.target.value.length <= 60) {
                setEventText(e.target.value);
              }
            }}
          ></textarea>
          <button className="event-popup-btn" onClick={handleEventSubmit}>
            {editingEvent ? 'Update Event' : 'Add Event'}
          </button>
          <button className="close-event-popup" onClick={() => setShowEventPopup(false)}>
            <i className="bx bx-x"></i>
            <CloseSharpIcon />
          </button>
        </div>
      )}
    </div>
  );
};


export default CalendarApp;


