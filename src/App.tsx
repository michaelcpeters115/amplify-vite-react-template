import React, { useState, useEffect } from 'react';
import firebase from './firebase'; // Firebase configuration
import './App.css';

interface ScreenTimeEntry {
  date: string;
  hours: number;
  notes: string;
}

const App: React.FC = () => {
  const [entries, setEntries] = useState<ScreenTimeEntry[]>([]);
  const [date, setDate] = useState('');
  const [hours, setHours] = useState<number>(0);
  const [notes, setNotes] = useState('');
  const [screenTimeLimit, setScreenTimeLimit] = useState<number>(2); // Limit in hours
  const [currentScreenTime, setCurrentScreenTime] = useState<number>(0);
  const [isTracking, setIsTracking] = useState(false);
  const [liveClock, setLiveClock] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveClock(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isTracking) {
      const interval = setInterval(() => {
        setCurrentScreenTime((prev) => prev + 0.01); // Add time in hours
      }, 36); // Every 36 seconds adds 0.01 hour

      return () => clearInterval(interval);
    }
  }, [isTracking]);

  useEffect(() => {
    if (currentScreenTime >= screenTimeLimit) {
      alert('You have reached your screen time limit!');
      setIsTracking(false);
    }
  }, [currentScreenTime, screenTimeLimit]);

  const addEntry = async () => {
    const newEntry = { date: new Date().toLocaleDateString(), hours: currentScreenTime, notes };
    setEntries([...entries, newEntry]);
    setCurrentScreenTime(0);
    setNotes('');
    
    // Save entry to Firebase
    await firebase.firestore().collection('entries').add(newEntry);
  };

  const startTracking = () => setIsTracking(true);
  const stopTracking = () => setIsTracking(false);

  return (
    <div className="app-container">
      <h1>LimitX</h1>
      <h2>Current Time: {liveClock.toLocaleTimeString()}</h2>
      <div className="input-container">
        <label>
          Set Screen Time Limit (hrs):
          <input
            type="number"
            value={screenTimeLimit}
            onChange={(e) => setScreenTimeLimit(Number(e.target.value))}
          />
        </label>
        <button onClick={startTracking}>Start Tracking</button>
        <button onClick={stopTracking}>Stop Tracking</button>
        <button onClick={addEntry}>Upload Entry</button>
      </div>
      <h2>Your Screen Time</h2>
      <p>Current Session: {currentScreenTime.toFixed(2)} hrs</p>
      <ul className="entry-list">
        {entries.map((entry, index) => (
          <li key={index}>
            <strong>Date:</strong> {entry.date} | <strong>Hours:</strong> {entry.hours.toFixed(2)} |{' '}
            <strong>Notes:</strong> {entry.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
