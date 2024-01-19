const Blog = require('../models/blog')
initialBlogs = [
    {
        content: 'Testers Test 1',
        important: true,
        title: 'Title 1',
        url: 'Url 1'
    },
    {
        content: 'Testers Test 2',
        important: false,
        title: 'Title 2',
        url: 'Url 2'
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDB,
}