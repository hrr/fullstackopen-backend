const { sum } = require('../utils/helpers')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return sum(blogs.map(x => x.likes))
}


module.exports = {
    dummy,
    totalLikes
}