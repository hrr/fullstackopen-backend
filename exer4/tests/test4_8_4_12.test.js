const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs } = require('../utils/test_helper')

const api = supertest(app)
let initBlogs = []

beforeEach(async () => {
    initBlogs = initialBlogs()
    await Blog.deleteMany({})
    console.log('Deleted blogs')

    let blogO = new Blog(initBlogs[0])

    await blogO.save()
    console.log('Saved blog 1')

    blogO = new Blog(initBlogs[1])
    await blogO.save()
    console.log('Saved blog 2')
})

test('4_8_list_blogs', async () => {
    const resp = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(resp.body).toHaveLength(initBlogs.length)
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