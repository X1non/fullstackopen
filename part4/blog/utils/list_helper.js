const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  // list reduce loops all the list elements
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  let mostLikedBlog
  for (let i=0; i < blogs.length; i++) {
    if (mostLikedBlog == undefined || blogs[i].likes > mostLikedBlog.likes) {
      mostLikedBlog = {
        title: blogs[i].title,
        author: blogs[i].author,
        likes: blogs[i].likes
      }
    }
  }
  return mostLikedBlog
}

// TODO: Exercise 4.6 and 4.7

module.exports = {
  dummy, totalLikes, favoriteBlog
}