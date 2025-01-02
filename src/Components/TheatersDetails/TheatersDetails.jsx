import React, { useState } from 'react';
import './the.css';

const MovieShowtimes = () => {
  // Sample local movie data
  const movieData = {
    theatres: [
      {
        id: '1',
        name: 'AAA Cinemas: Ameerpet',
        showtimes: ['10:45 AM', '03:50 PM', '05:30 PM', '09:30 PM'],
        language: ['Telugu', 'Hindi'],
      },
      {
        id: '2',
        name: 'Alankar (Pratap Theatre): Langer House',
        showtimes: ['02:00 PM', '05:45 PM', '09:30 PM'],
        language: ['Telugu', 'Tamil'],
      },
      {
        id: '3',
        name: 'AMB Cinemas: Gachibowli',
        showtimes: ['12:55 PM', '03:50 PM'],
        language: ['Hindi', 'Malayalam'],
      },
      {
        id: '4',
        name: 'Aparna Cinemas: Nallagandla',
        showtimes: ['02:30 PM', '06:30 PM', '07:25 PM', '10:30 PM', '11:15 PM'],
        language: ['Telugu', 'Malayalam'],
      },
    ],
  };


  const [selectedLanguage, setSelectedLanguage] = useState('Telugu');
  const [date, setDate] = useState(new Date()); // Initial date


  const handleLanguageChange = (language) => setSelectedLanguage(language);

  // Function to handle date change (e.g., on button click)
  const handleDateChange = (direction) => {
    const newDate = new Date(date);

    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (direction === 'next') {
      newDate.setDate(newDate.getDate() + 1);
    }

    setDate(newDate);
  };

  // Filter theaters by selected language
  const filteredTheatres = movieData.theatres.filter((theatre) =>
    theatre.language.includes(selectedLanguage)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Date Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Panel */}
        <div style={{ flex: '1' }}>
          <h1>Pushpa 2: The Rule - Showtimes</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button onClick={() => handleDateChange('prev')} style={{ marginRight: '10px' }}>
            Previous
          </button>
          <button onClick={() => handleDateChange('next')}>Next</button>
          <p style={{ marginTop: '10px' }}>
            Selected Date: {date.toDateString()}
          </p>
        </div>
      </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <span className="avail">🟩Available</span>
            <span className="fill">🟧Fast filling</span>
          </div>

          {/* Showtimes Divs */}
          <div className="showtimes-container" style={{ marginTop: '20px' }}>
            {filteredTheatres.map((theatre) => (
              <div key={theatre.id} className="theatre-card">
                <h3 className="theatre-name">{theatre.name}</h3>
                <div className="showtimes">
                  {theatre.showtimes.map((time, index) => (
                    <span key={index} className="showtime">{time}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ marginLeft: '20px', minWidth: '200px' }}>
          <h2>Languages</h2>
          <select
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
            style={{ padding: '10px', fontSize: '1em' }}
          >
            <option value="Telugu">Telugu</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Malayalam">Malayalam</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MovieShowtimes;
