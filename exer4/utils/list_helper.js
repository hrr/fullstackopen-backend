const { sum } = require('../utils/helpers')
const dummy = (blogs) => {
    return 1
}

const sortLikes = (blogs, asc) => {
    return blogs.sort((x, y) => (x.likes - y.likes) * asc)
}

const totalLikes = (blogs) => {
    return sum(blogs.map(x => x.likes))
}


module.exports = {
    dummy,
    totalLikes,
    sortLikes
}