const { last } = require('lodash')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('mostLikes', () => {
  const listWithBlogs = [
    {
      _id: '0',
      title: 'Go To Statement Considered Harmfula',
      author: 'Edsger W. Dijkstraa',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfula.html',
      likes: 1,
      __v: 0
    },
    {
      _id: '1',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
      title: 'Go To Statement Considered Harmfula',
      author: 'Edsger W. Dijkstraa',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfula.html',
      likes: 2,
      __v: 0
    },
    {
      _id: '3',
      title: 'Go To Statement Considered Harmfula',
      author: 'Edsger W. Dijkstraa',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfula.html',
      likes: 11,
      __v: 0
    },
    {
      _id: '4',
      title: 'Go To Statement Considered Harmfula',
      author: 'Edsger W. Dijkstraaa',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfula.html',
      likes: 11,
      __v: 0
    },
    {
      _id: '5',
      title: 'Go To Statement Considered Harmfula',
      author: 'Edsger W. Dijkstraaa',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfula.html',
      likes: 11,
      __v: 0
    }
  ]

  test('when list has many blogs, return the blogger with most likes', () => {
    const result = listHelper.mostLikesAuthor(listWithBlogs)
    expect(result.author).toEqual('Edsger W. Dijkstraaa')
  })
})

describe('mostBlogs', () => {
  const listWithBlogs = [
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmfula',
      author: 'Edsger W. Dijkstraa',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfula.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmfula',
      author: 'Edsger W. Dijkstraa',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfula.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmfula',
      author: 'Edsger W. Dijkstraa',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfula.html',
      likes: 11,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmfula',
      author: 'Edsger W. Dijkstraaa',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfula.html',
      likes: 11,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmfula',
      author: 'Edsger W. Dijkstraaa',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfula.html',
      likes: 11,
      __v: 0
    }
  ]

  test('when list has many blogs, return the top blogger with most blogs', () => {
    const result = listHelper.mostBlogsAuthor(listWithBlogs)
    expect(result.author).toEqual('Edsger W. Dijkstraa')
  })
})

describe('favoriteBlog', () => {
  const listWithBlogs = [
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmfula',
      author: 'Edsger W. Dijkstraa',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfula.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmfula',
      author: 'Edsger W. Dijkstraa',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfula.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmfula',
      author: 'Edsger W. Dijkstraa',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmfula.html',
      likes: 11,
      __v: 0
    }
  ]

  test('when list has many blogs, equals the likes of the highest one', () => {
    expect(listHelper.mostLikesBlog(listWithBlogs).likes).toEqual(12)
  })
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})