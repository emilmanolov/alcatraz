import React, { useState } from 'react';

import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

import { registerNewUser, logInUser, logOutUser } from './backend';

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  const [shouldRegister, setShouldRegister] = useState(false);

  function handleRegister ({username, password, coordinates}) {
    registerNewUser({ username, password, coordinates })
      .then(() =>{
        setShouldRegister(false);
        alert('Registration successful, please log in now.');
      })
      .catch((reason) => {
        alert(`Registration failed with reason:\n${reason}`);
      });
  }

  function handleLogIn (username, password) {
    logInUser(username, password)
      .then((res) => {
        const { username, isAdmin } = res;
        setLoggedInUser({ username, isAdmin });
      })
      .catch(() => {
        setLoggedInUser();
        alert('Unable to log in');
      });
  }

  function handleLogOut () {
    logOutUser()
      .then(() => {
        setLoggedInUser();
      })
      .catch(() => {
        alert('Unable to log out')
      });
  }

  if (!loggedInUser) {
    return (
      shouldRegister
        ? <RegisterPage
            onSubmit={handleRegister}
            onLoginClick={() => setShouldRegister(false)}
          />
        : <LoginPage
            onSubmit={handleLogIn}
            onRegisterClick={() => setShouldRegister(true)}
          />
    );
  }

  return (
    <div className="App">
      <div>Hello, {loggedInUser.username}</div>
      <button onClick={handleLogOut}>LogOut</button>
      {loggedInUser.isAdmin
        ? <AdminDashboard />
        : <UserDashboard />}
    </div>
  );
}
