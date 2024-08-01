import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AWS from 'aws-sdk';
import CircularProgress from '@mui/material/CircularProgress';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import IconButton from '@mui/material/IconButton';
import OrganizationNavBar from '../../OrganizationNavBar/OrganizationNavBar';
import Footer from '../../Footer/Footer';
import './Calendar.css';

const CalendarApp = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const causes = [
    'Computers and technology',
    'Hunger',
    'Children and youth',
    'Environment',
    'Education and literacy',
    'Health and medicine',
    'Arts and culture',
    'Seniors'
  ];

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: '00', minutes: '00' });
  const [eventText, setEventText] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventRelatedCause, setEventRelatedCause] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);
  const [spotsAvailable, setSpotsAvailable] = useState(10);
  const [loading, setLoading] = useState(false);
  const [opportunityImage, setOpportunityImage] = useState(null);

  const navigate = useNavigate();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      const organizationId = localStorage.getItem('organizationId');
      if (!organizationId) {
        console.error('No organization ID found');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`https://project-1-uljs.onrender.com/opps?organizationId=${organizationId}`);
        setOpportunities(response.data);
        localStorage.setItem('events', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOpportunities();
  }, []);

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
      setEventRelatedCause('');
      setSpotsAvailable(10);
      setEditingEvent(null);
      setOpportunityImage(null);
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleEventSubmit = async () => {
    const organizationId = parseInt(localStorage.getItem('organizationId'));
    if (!organizationId || isNaN(organizationId)) {
      console.error('Invalid organizationId');
      return;
    }
  
    const newEvent = {
      title: eventName || '',
      description: eventText || '',
      organizationId: organizationId,
      skillsRequired: '',
      ageRange: '',
    };
  
    if (eventTime.hours && eventTime.minutes) {
      // Create a new Date object with the selected date and time
      const eventDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        parseInt(eventTime.hours),
        parseInt(eventTime.minutes)
      );

      // Format the date as an ISO string and remove the milliseconds
      newEvent.dateTime = eventDateTime.toISOString().split('.')[0] + 'Z';
    }
  
    if (eventLocation) newEvent.address = eventLocation;
    if (eventRelatedCause) newEvent.relatedCause = eventRelatedCause;
    if (spotsAvailable) newEvent.spotsAvailable = parseInt(spotsAvailable);
  
    if (opportunityImage) {
      const S3_BUCKET = "sparkserve";
      const REGION = "us-east-2";
  
      AWS.config.update({
        accessKeyId: import.meta.env.VITE_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
        region: REGION,
      });
  
      const s3 = new AWS.S3();
      const params = {
        Bucket: S3_BUCKET,
        Key: `opportunities/${Date.now()}-${opportunityImage.name}`,
        Body: opportunityImage,
      };
  
      try {
        const data = await s3.upload(params).promise();
        newEvent.pictureUrl = data.Location;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  
    try {
      let response;
      if (editingEvent) {
        response = await axios.put(`https://project-1-uljs.onrender.com/opps/${editingEvent.opportunityId}`, newEvent);
      } else {
        response = await axios.post('https://project-1-uljs.onrender.com/opps', newEvent);
      }
      const updatedOpportunities = editingEvent 
        ? opportunities.map(opp => opp.opportunityId === editingEvent.opportunityId ? response.data : opp)
        : [...opportunities, response.data];
      setOpportunities(updatedOpportunities);
      localStorage.setItem('events', JSON.stringify(updatedOpportunities));
      setShowEventPopup(false);
      resetForm();
    } catch (error) {
      console.error('Error creating/updating opportunity:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditEvent = (event) => {
    const eventDate = new Date(event.dateTime);
    setSelectedDate(eventDate);
    setEventTime({
      hours: eventDate.getUTCHours().toString().padStart(2, '0'),
      minutes: eventDate.getUTCMinutes().toString().padStart(2, '0'),
    });
    setEventText(event.description);
    setEventName(event.title);
    setEventLocation(event.address);
    setEventRelatedCause(event.relatedCause);
    setSpotsAvailable(event.spotsAvailable);
    setEditingEvent(event);
    setOpportunityImage(null);
    setShowEventPopup(true);
  };

  const handleDeleteEvent = (eventId) => {
    setEventIdToDelete(eventId);
    setShowConfirmModal(true);
  };

  const confirmDeleteEvent = async () => {
    try {
      await axios.delete(`https://project-1-uljs.onrender.com/opps/${eventIdToDelete}`);
      const updatedOpportunities = opportunities.filter(opp => opp.opportunityId !== eventIdToDelete);
      setOpportunities(updatedOpportunities);
      localStorage.setItem('events', JSON.stringify(updatedOpportunities));
      setShowConfirmModal(false);
      setEventIdToDelete(null);
    } catch (error) {
      console.error('Error deleting opportunity:', error);
    }
  };

  const cancelDeleteEvent = () => {
    setShowConfirmModal(false);
    setEventIdToDelete(null);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setEventTime((prevTime) => ({ ...prevTime, [name]: value.padStart(2, '0') }));
  };

  const handleImageChange = (e) => {
    setOpportunityImage(e.target.files[0]);
  };

  const resetForm = () => {
    setEventTime({ hours: '00', minutes: '00' });
    setEventText('');
    setEventName('');
    setEventLocation('');
    setEventRelatedCause('');
    setSpotsAvailable(10);
    setEditingEvent(null);
    setOpportunityImage(null);
  };

  return (
    <>
      <OrganizationNavBar />
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
                <ChevronLeftIcon style={{ color: '#ff66c4' }} />
              </button>
              <h2 className="month">{monthsOfYear[currentMonth]},</h2>
              <h2 className="year">{currentYear}</h2>
              <button onClick={nextMonth} className="button">
                <ChevronRightIcon style={{ color: '#ff66c4' }} />
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
                  {opportunities.filter(opp => 
                    new Date(opp.dateTime).getDate() === day + 1 &&
                    new Date(opp.dateTime).getMonth() === currentMonth &&
                    new Date(opp.dateTime).getFullYear() === currentYear
                  ).map(opp => (
                    <div key={opp.opportunityId} className="opportunity-dot"></div>
                  ))}
                </span>
              ))}
            </div>
          </div>
          <div className="upcoming-events-container">
            <h2>Scheduled Opportunities</h2>
            {loading ? (
              <div className="loading-container">
                <CircularProgress sx={{ color: '#ff66c4' }} />
              </div>
            ) : (
              <div className="upcoming-events-scroll">
                {opportunities.filter(opp => opp.organizationId === parseInt(localStorage.getItem('organizationId'))).map((opportunity) => (
                  <div className="upcoming-event" key={opportunity.opportunityId}>
                    <button className="delete-event" onClick={() => handleDeleteEvent(opportunity.opportunityId)}>
                      <CloseSharpIcon />
                    </button>
                    <div className="event-date-wrapper">
                      <div className="upcoming-event-date">{`${monthsOfYear[new Date(opportunity.dateTime).getMonth()]} ${new Date(opportunity.dateTime).getDate()}, ${new Date(opportunity.dateTime).getFullYear()}`}</div>
                      <div className="upcoming-event-time">{new Date(opportunity.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                    <div className="upcoming-event-name">{opportunity.title}</div>
                    <div className="upcoming-event-location">{opportunity.address}</div>
                    <div className="upcoming-event-text">{opportunity.description}</div>
                    <div className="upcoming-event-cause">Related Cause: {opportunity.relatedCause}</div>
                    <div className="upcoming-event-spots">Spots Available: {opportunity.spotsAvailable}</div>
                    <button onClick={() => handleEditEvent(opportunity)}>Edit</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {showEventPopup && (
          <div className="event-popup">
            <div className="selected-date">
              {`Selected Date: ${selectedDate.getDate()} ${monthsOfYear[selectedDate.getMonth()]}, ${selectedDate.getFullYear()}`}
            </div>
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={23}
                className="hours"
                value={eventTime.hours}
                onChange={handleTimeChange}
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={59}
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
            <select
              value={eventRelatedCause}
              onChange={(e) => setEventRelatedCause(e.target.value)}
            >
              <option value="">Select Related Cause</option>
              {causes.map((cause) => (
                <option key={cause} value={cause}>
                  {cause}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Enter Spots Available"
              value={spotsAvailable}
              onChange={(e) => setSpotsAvailable(parseInt(e.target.value))}
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
            <input type="file" onChange={handleImageChange} />
            <button className="event-popup-btn" onClick={handleEventSubmit}>
              {editingEvent ? 'Update Opportunity' : 'Add Opportunity'}
            </button>
            <button className="close-event-popup" onClick={() => setShowEventPopup(false)}>
              <CloseSharpIcon />
            </button>
          </div>
        )}
        {showConfirmModal && (
          <div className="confirm-modal">
            <div className="confirm-message">Are you sure you want to delete this opportunity?</div>
            <div className="confirm-buttons">
              <button className="confirm-button" onClick={confirmDeleteEvent}>Yes</button>
              <button className="confirm-button" onClick={cancelDeleteEvent}>No</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CalendarApp;






