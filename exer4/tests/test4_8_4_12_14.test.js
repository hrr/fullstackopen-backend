const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const test_helper = require('../utils/test_helper')

const api = supertest(app)
let initBlogs = []

beforeEach(async () => {
    initBlogs = test_helper.initialBlogs
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

test('4_10_add_blog', async () => {
    const newBlog = { content: 'Testers Test 3', important: false, title: 'Title 3', url: 'Url 3' }

    const postResp = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const getResp = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(getResp.body).toHaveLength(initBlogs.length + 1)
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
    const newBlog = { content: 'Testers Test 4', important: false , important: false }
    expect(newBlog).not.toHaveProperty('title')
    expect(newBlog).not.toHaveProperty('url')

    const postResp = await api
        .post('/api/blogs')
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