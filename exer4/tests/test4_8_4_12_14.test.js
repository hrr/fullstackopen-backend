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

test('4_8_list_blogs', async () => {
    const resp = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(resp.body).toHaveLength(test_helper.initialBlogs.length)
})

test('4_9_blog_ids', async () => {
    const resp = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    resp.body.forEach(blog => {
        expect(blog).toHaveProperty('id')
    })

    expect(resp.body).toBeDefined()
})

test('4_10_add_blog', async () => {
    const newBlog = { content: 'Testers Test 3', important: false, title: 'Title 3', url: 'Url 3' }
    const user = { username: user0.username, password: test_helper.initialUsers[0].password }
    const tokenResp = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const postResp = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${tokenResp.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const getResp = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(getResp.body).toHaveLength(test_helper.initialBlogs.length + 1)
})

test('4_11_blog_likes', async () => {
    const resp = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    resp.body.forEach(blog => {
        expect(blog).toHaveProperty('likes')
    })
})

test('4_12_blog_properties', async () => {
    const user = { username: user0.username, password: test_helper.initialUsers[0].password }
    const tokenResp = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const newBlog = { content: 'Testers Test 4', important: false, important: false }
    expect(newBlog).not.toHaveProperty('title')
    expect(newBlog).not.toHaveProperty('url')

    const postResp = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${tokenResp.body.token}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

describe('4_12 deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await test_helper.blogsInDB()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await test_helper.blogsInDB()

        expect(blogsAtEnd).toHaveLength(
            test_helper.initialBlogs.length - 1
        )

        const contents = blogsAtEnd.map(r => r.content)

        expect(contents).not.toContain(blogToDelete.content)
    })
})

describe('4_13 update of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await test_helper.blogsInDB()

        const blogToUpdate = blogsAtStart[0]
        expect(blogToUpdate.likes).toBe(0)
        blogToUpdate.likes = 1

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

        const blogsAtEnd = await test_helper.blogsInDB()

        expect(blogsAtEnd.find(b => b.id === blogToUpdate.id).likes).toBe(blogToUpdate.likes)
    })
})