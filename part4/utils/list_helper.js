const dummy = (blog) => {
  return 1;
};
const totalLikes = (blogsList) => {
  return blogsList.reduce((a, b) => a + b.likes, 0);
};
const favoriteBlog = (blogsList) => {
  let temp = { id: 0, likes: 0 };
  blogsList.map(({ likes }, index) => {
    if (likes > temp.likes) temp = { id: index, likes: likes };
    return 0
  });
  return blogsList[temp.id];
};

const mostBlogs = (blogsMatrix)=>{
}

const mostLikes = (blogsMatrix)=>{
  
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
