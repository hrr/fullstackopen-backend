const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const test_helper = require('../utils/test_helper')

const api = supertest(app)

beforeEach(async () => {
    const initialUsers = test_helper.initialUsers
    await User.deleteMany({})
    console.log('Deleted users')

    let userO = new User(initialUsers[0])

    await userO.save()
    console.log('Saved user 1')
})

test('4_15_create_user', async () => {
    const newUser = {
        username: "Testusername 1",
        name: "Testusername 1",
        password: "Testpassword1"
    }
    const resp = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
})
