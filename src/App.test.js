import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders a login form with new user registration option', () => {
  const { getByText } = render(<App />);
  const usernameElement = getByText(/username/i);
  const passwordElement = getByText(/password/i);
  const registerElement = getByText(/register/i);
  expect(usernameElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
  expect(registerElement).toBeInTheDocument();
});
