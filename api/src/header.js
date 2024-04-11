import React, { useState, useEffect } from 'react';
import './header.css';

const Header = () => {
  const [apiData, setApiData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://catfact.ninja/fact')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then(data => {
          setApiData(data.fact);
          console.log('API Data:', data.fact);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError(error.message);
        });
    };

   
    fetchData();

    
    const interval = setInterval(fetchData, 10000);

    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header">
    
      <div className="movingTextContainer">
        <h1>Api Data</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <p className="movingText">{apiData}</p>
          
        )}
      </div>
    </div>
  );
}

export default Header;
