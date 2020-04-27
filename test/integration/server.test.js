const app = require('../../src/server/server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const nock = require('nock')

chai.use(chaiHttp)

const { expect } = chai

process.env.OWM_APP_ID = '54d2d4f04a0a5e1916c049c37de3ce10'

describe('server', () => {
  describe('/weather', () => {
    context('when not logged in', () => {
      it('should return HTTP 401', async () => {
        const res = await chai.request(app).get('/weather')
        expect(res).to.have.status(401)
      })
    })

    context('when logged in', () => {
      let agent

      before(async () => {
        agent = chai.request.agent(app)

        await agent
          .post('/login')
          .send({ username: 'admin', password: 'password' })

        nock('http://api.openweathermap.org')
          .get('/data/2.5/onecall')
          .query({
            lat: 42.6975,
            lon: 23.3242,
            appid: process.env.OWM_APP_ID,
            units: 'metric',
            lang: 'en'
          })
          .reply(200, {
            timezone: 'Europe/Sofia',
            lat: 42.7,
            lon: 23.32,
            current: [],
            hourly: [],
            daily: []
          })
      })

      after(() => {
        agent.close()
      })

      it('should return the weather data', async () => {
        const res = await agent.get('/weather')

        expect(res)
          .to.have.status(200)

        expect(res.body)
          .to.have.property('timezone', 'Europe/Sofia')

        expect(res.body)
          .to.have.property('lat', 42.7)

        expect(res.body)
          .to.have.property('lon', 23.32)

        expect(res.body)
          .to.have.property('current')

        expect(res.body)
          .to.have.property('hourly')

        expect(res.body)
          .to.have.property('daily')
      })

      context('when logged out', () => {
        before(async () => {
          await agent
            .post('/logout')
        })

        it('should no longer return the weather data', async () => {
          const res = await agent.get('/weather')

          expect(res)
            .to.have.status(401)
        })
      })
    })
  })
})
