import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
// import MovieShowtimes from './Components/TheatersDetails/TheatersDetails';
//import Theatres from './Components/TheatresData/Theatresdata';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  
    {/* <MovieShowtimes/> */}
    {/* <Theatres/> */}
    
  </React.StrictMode>
);



reportWebVitals();
