import axios from 'axios';

export async function registerNewUser({ username, password, coordinates }) {
  return axios
    .post('/register', { username, password, coordinates })
    .then(res => res.data)
    .catch(err => {
      const reason = (err.response && err.response.data) || 'Unknown';
      return Promise.reject(reason);
    });
}

export async function logInUser(username, password) {
  return axios
    .post('/login', { username, password })
    .then(res => res.data)
}

export async function logOutUser() {
  return axios
    .post('/logout')
    .then(res => res.data);
}

export async function loadWeatherData() {
  return axios
    .get('/weather')
    .then(res => res.data);
}

export async function loadUsers(cb) {
  return axios
    .get('/admin/users')
    .then(res => res.data);
}

export async function deleteUser(userId) {
  return axios
    .delete('/admin/users', { data: { userId } })
    .then(res => res.data);
}
