const { resPost } = require("./post");

module.exports = {
  postData: async (data) => {
    const result = Promise.all(
      data.map(async (post) => {
        const posts = await resPost(post);
        return posts;
      })
    );
    return result;
  },
};