const reverse = (string) => {
    return string
      .split('')
      .reverse()
      .join('')
  }
  
  const sum = (array) => {
    const reducer = (sum, item) => {
      return sum + item
    }
  
    return array.reduce(reducer, 0)
  }

  const average = (array) => {
    const reducer = (sum, item) => {
      return sum + item
    }
  
    return array.reduce(reducer, 0) / array.length
  }
  
  module.exports = {
    reverse,
    average,
    sum,
  }