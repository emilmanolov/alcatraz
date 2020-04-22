Weather Dashboard Full Stack Task

## About

This is a simple application, which is using the [OpenWeatherMap One Call API](https://openweathermap.org/api/one-call-api) to get weather forecast and show it in a dashboard to registered users. All registered users are stored in memory, which means once the server is restarted, all user information is lost (except the default built-in `admin` one). Both front-end and back-end must be served from the same server, because the current user session implementation is cookie based.

## How to test

1. Clone this repository locally:

`git clone https://github.com/emilmanolov/alcatraz.git`

2. Change working directory to the project directory:

`cd alcatraz`

3. Install project dependencies:

`npm install`

4. Build the UI:

`npm run build`

5. Start the back-end server:

`OWM_APP_ID=54d2d4f04a0a5e1916c049c37de3ce10 npm run start:backend`

6. Open http://localhost:8080 in your favourite web browser. This will show you the user login page. You can register a new user, then log in and check your weather forecast. You can also log in as an administrator using user `admin` and password `password` in order to see the current registered non-admin users and delete them.
