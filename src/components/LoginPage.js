import React, { useState } from 'react';

export default function LoginPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(username, password);
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
          <input type="submit" value="Log In" />
          or <span className="link" onClick={props.onRegisterClick}>Register</span>
      </div>
    </form>
  );
}
