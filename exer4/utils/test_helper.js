const Blog = require('../models/blog')
const User = require('../models/user')
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

initialUsers = [
    {
        username: "Testusername",
        name: "Testusername",
        password: "Testpassword"
    },
    {
        username: "Testusername1",
        name: "Testusername1",
        password: "Testpassword1"
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({}).populate('user')
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({}).populate('blogs')
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDB,
    usersInDB,
    initialUsers
}