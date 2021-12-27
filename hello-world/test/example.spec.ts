import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import User from 'App/Models/User'
const baseUrl = `http://localhost:3333`


test.group('UserCRUD', () => {

  // test('ensure home page works', async (assert) => {
  //   /**
  //    * Make request
  //    */
  //   const { text } = await supertest(baseUrl).get('/').expect(200)

  //   /**
  //    * Construct JSDOM instance using the response HTML
  //    */
  //   const { document } = new JSDOM(text).window

  //   const title = document.querySelector('.title')
  //   assert.exists(title)
  //   assert.equal(title!.textContent!.trim(), 'It Works!')
  // })

  test('creating a user', async (assert) => {
    const user = new User()
    user.email = 'milks@isadonisjs.com'
    user.username = 'memesis'
    user.password = 'secret'
    await user.save()

    assert.notEqual(user.password, 'secret2')
  })

  // test('delete', async(assert) => {
  //   const user = await User.findOrFail(11)
  //   let deleted = false
  //   try{
  //     if(user.delete()){
  //       deleted = true
  //       console.log(user)
  //     }else{
  //       deleted = false
  //     }
  //   }catch{
  //     return
  //   }
  //   assert.equal(deleted, true)
  // })

  test('update', async(assert) => {
    const user = await User.findOrFail(1)
    const data = {email: 'newUser@mail.com'}
    user.merge(data)
    let updated = false
    if(await user.save()){
      updated = true
    }else{
      updated = false
    }
    assert.equal(updated, true)

  })

})
