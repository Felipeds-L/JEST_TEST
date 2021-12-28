import test from 'japa'
import supertest from 'supertest'
const baseUrl = `http://localhost:3333`
import User from '../app/Models/User'

test.group('Auth', () =>{
  test('testing authentication', async () => {
    const user = new User()
    user.email = 'felipe@luby.software'
    user.password = 'senha'

    const logged = await supertest(baseUrl).post('/api/login').send(user).expect(200)

    const obj_login = JSON.parse(logged.text)
    console.log(obj_login['token'])


  })

})

test.group('UserCRUD', () => {

  test('testing user index route', async () => {
    const b = await supertest(baseUrl).get('/user').expect(200)
    console.log(b)
  });

  test('testing user show route', async () => {
    await supertest(baseUrl).get('/user/11').expect(200)
  });

  test('testing user delete route', async() => {
    await supertest(baseUrl).delete('/user/11').expect(200)
  })

  test('testing user create route', async () => {
    const user = new User()
    user.email = 'tddAuthorized@user.login'
    user.username = 'newLogin',
    user.password = 'new'
    await supertest(baseUrl).post('/user').send(user).expect(200)
  })

    test('testing user update route', async () => {
      const user = new User()
      user.email = 'novotdd@teste.com'
      user.username = 'tddTeste',
      await supertest(baseUrl).put('/user/8').send(user).expect(200)
    })

})


