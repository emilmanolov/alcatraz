const axios = require('axios');

module.exports = {
  getData: async (ctx) => {
    const openWeatherMapAppId = process.env.OWM_APP_ID;

    if (!openWeatherMapAppId) {
      console.error('Please set OWM_APP_ID in order to get weather information.');
      ctx.throw(404);
    }

    const { latitude, longitude } = ctx.state.user.coordinates;

    const response = await axios.get('http://api.openweathermap.org/data/2.5/onecall', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: openWeatherMapAppId,
        units: 'metric',
        lang: 'en'
      }
    });

    if (response.status === 200) {
      ctx.body = response.data;
    }
  }
}
