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

const mostLikesAuthor = (blogs) => {
    const authorLikes = totalAuthorLikes(blogs)
    return sort(authorLikes, ['likes'])[authorLikes.length - 1]
}

const mostBlogsAuthor = (blogs) => {
    const authorBlogs = sort(_.values(_.groupBy(blogs.map(x => x.author))).map(d => ({ author: d[0], blogs: d.length })), 'blogs')
    return authorBlogs[authorBlogs.length - 1]
}

const uniqueAuthors = (blogs) => {
    const uniqueAuthors = _.map(blogs, 'author').filter((value, index, array) => { return array.indexOf(value) === index })
    return uniqueAuthors
}

const totalAuthorLikes = (blogs) => {
    const sumByAuthor = blogs.reduce((final, curr) => {
        if (!final[curr.author]) final[curr.author] = curr.likes
        else final[curr.author] += curr.likes
        return final
    }, {})

    return Object.entries(sumByAuthor).map(x => ({ 'author': x[0], 'likes': x[1] }))
}

const totalLikes = (blogs) => {
    return sum(blogs.map(x => x.likes))
}


module.exports = {
    dummy,
    totalLikes,
    mostLikesBlog,
    mostBlogsAuthor,
    totalAuthorLikes,
    mostLikesAuthor
}