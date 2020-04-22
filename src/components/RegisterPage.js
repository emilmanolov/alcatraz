import React, { useState } from 'react';

export default function RegisterPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [coordinates, setCoordinates] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({ username, password, coordinates });
  }

  function handleGetCurrentPosition(e) {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setCoordinates(latitude + ', ' + longitude);
        },
        (error) => {
          alert(error.message);
          setCoordinates('');
        }
      );
    } else {
      alert('Geolocation is not supported');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
      </div>
      <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      </div>
      <div>
          <label>Coordinates:</label>
          <input
            type="text"
            name="coordinates"
            value={coordinates}
            onChange={(e) => setCoordinates(e.target.value)}
          />
          <small>(example: "42.6975, 23.3242")</small>
          <button onClick={handleGetCurrentPosition}>Get current location</button>
      </div>
      <div>
          <input type="submit" value="Register" />
          or <span className="link" onClick={props.onLoginClick}>LogIn</span>
      </div>
    </form>
  );
}
