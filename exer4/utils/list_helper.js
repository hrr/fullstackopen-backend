const { sum } = require('../utils/helpers')
const _ = require('lodash')
const dummy = (blogs) => {
    return 1
}

const sort = (blogs, entities) => {
    const sortedBlogs = _.sortBy(blogs, [entities])
    return sortedBlogs
}

const mostLikesBlog = (blogs) => {
    return sort(blogs, ['likes'])[blogs.length - 1]
}

const mostBlogsAuthor = (blogs) => {
    const authorBlogs = sort(_.values(_.groupBy(blogs.map(x => x.author))).map(d => ({author: d[0], blogs: d.length})), 'blogs')
    return authorBlogs[authorBlogs.length - 1]
}

const totalLikes = (blogs) => {
    return sum(blogs.map(x => x.likes))
}


module.exports = {
    dummy,
    totalLikes,
    mostLikesBlog,
    mostBlogsAuthor
}