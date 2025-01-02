import React, { useState } from 'react';

const MovieShowtimes = () => {
  // Sample local movie data
  const movieData = {
    theatres: [
      {
        id: '1',
        name: 'AAA Cinemas: Ameerpet',
        showtimes: ['10:45 AM', '03:50 PM', '05:30 PM', '09:30 PM'],
        format: 'Laser Dolby Atmos',
        availability: 'Available',
      },
      {
        id: '2',
        name: 'Alankar (Pratap Theatre): Langer House',
        showtimes: ['02:00 PM', '05:45 PM', '09:30 PM'],
        format: 'Standard',
        availability: 'Available',
      },
      {
        id: '3',
        name: 'AMB Cinemas: Gachibowli',
        showtimes: ['12:55 PM', '03:50 PM'],
        format: 'Barco Flagship Laser',
        availability: 'Fast Filling',
      },
      {
        id: '4',
        name: 'Aparna Cinemas: Nallagandla',
        showtimes: ['02:30 PM', '06:30 PM', '07:25 PM', '10:30 PM', '11:15 PM'],
        format: '4K Laser Atmos',
        availability: 'Available',
      },
    ],
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLanguage, setSelectedLanguage] = useState('Telugu');
  const [selectedTheatre, setSelectedTheatre] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleTheatreChange = (theatre) => {
    setSelectedTheatre(theatre);
  };

  return (
    <div>
      <h1>Pushpa 2: The Rule - Showtimes</h1>

      {/* Date Picker */}
      <div>
        <label>Select Date: </label>
        <input
          type="date"
          value={selectedDate.toISOString().slice(0, 10)}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
        />
      </div>

      {/* Language Selector */}
      <div>
        <label>Select Language: </label>
        <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
          <option value="Telugu">Telugu</option>
          <option value="Hindi">Hindi</option>
          <option value="Tamil">Tamil</option>
          <option value="Malayalam">Malayalam</option>
        </select>
      </div>

      {/* Theatre Selector */}
      <div>
        <label>Select Theatre: </label>
        <select value={selectedTheatre} onChange={(e) => handleTheatreChange(e.target.value)}>
          <option value="">All Theatres</option>
          {movieData.theatres.map((theatre) => (
            <option key={theatre.id} value={theatre.id}>
              {theatre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Showtimes Table */}
      {movieData && (
        <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Theatre</th>
              <th>Showtimes</th>
              <th>Format</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {movieData.theatres
              .filter((theatre) => !selectedTheatre || theatre.id === selectedTheatre)
              .map((theatre) => (
                <tr key={theatre.id}>
                  <td>{theatre.name}</td>
                  <td>{theatre.showtimes.join(', ')}</td>
                  <td>{theatre.format}</td>
                  <td>{theatre.availability}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MovieShowtimes;
