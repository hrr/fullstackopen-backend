const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const test_helper = require('../utils/test_helper')

const api = supertest(app)

let user0
beforeEach(async () => {
    const initBlogs = test_helper.initialBlogs
    const initialUsers = test_helper.initialUsers


    user0 = new User(initialUsers[0])
    const passwordHash0 = await bcrypt.hash(initialUsers[0].password, 10)
    user0.passwordHash = passwordHash0


    let user1 = new User(initialUsers[1])
    const passwordHash1 = await bcrypt.hash(initialUsers[1].password, 10)
    user1.passwordHash = passwordHash1

    let blog0 = new Blog(initBlogs[0])
    blog0.user = user0._id
    let blog1 = new Blog(initBlogs[1])
    blog1.user = user1._id

    user0.blogs = user0.blogs.concat(blog0._id)
    user1.blogs = user1.blogs.concat(blog1._id)

    await User.deleteMany({})
    await user0.save()
    await user1.save()

    await Blog.deleteMany({})
    await blog0.save()
    await blog1.save()
})

test('4_15_create_user', async () => {
    let newUser = {
        username: "Testusername2",
        name: "Testusername2",
        password: "Testpassword2"
    }
    const passwordHash = await bcrypt.hash(newUser.password, 10)
    newUser.passwordHash = passwordHash
    const resp = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const usersInDB = await test_helper.usersInDB()
    const newlyCreatedUser = usersInDB.find(x => x.username === newUser.username)
    expect(newlyCreatedUser.username).toBeDefined()
})

test('4_16_create_invalid_user_bad_username', async () => {
    const newUser = {
        username: "Te",
        name: "Tes4161",
        password: "Test"
    }
    expect(newUser.username.length).toBeLessThan(3)

    const resp = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

test('4_16_create_invalid_user_bad_password', async () => {
    const newUser = {
        username: "Testa",
        name: "Tes4162",
        password: "Te"
    }
    expect(newUser.password.length).toBeLessThan(3)
    const resp = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

test('4_17_bloglist_expansion', async () => {
    const resp = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    for (const blog of resp.body) {
        expect(blog.user).toBeDefined()
    }
})
