const initialBlogs = () => {
    const blogs = [
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
    return blogs
}

module.exports = {
    initialBlogs
}