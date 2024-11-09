import React, { useState } from 'react';

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

  const addEntry = () => {
    const newEntry = { date, hours, notes };
    setEntries([...entries, newEntry]);
    setDate('');
    setHours(0);
    setNotes('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Screen Time Tracker</h1>
      <div>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Hours:
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Notes:
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <button onClick={addEntry}>Add Entry</button>
      </div>
      <h2>Your Screen Time</h2>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            <strong>Date:</strong> {entry.date} | <strong>Hours:</strong> {entry.hours} |{' '}
            <strong>Notes:</strong> {entry.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
