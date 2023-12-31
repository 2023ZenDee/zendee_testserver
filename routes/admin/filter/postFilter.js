const authUtil = require("../../../module/authUtil");
const statusCode = require("../../../module/statusCode");
const responseMessage = require("../../../module/responseMessage");
const { sortPost } = require("../../../util/sort/sort");
const { manyPost } = require("../../../util/response/post");


const postFilter = async (req, res) => {
  const { sortBy, address, page, pageSize } = req.query;
  try {
    if(!sortBy && !address){
      return res
        .status(400)
        .send(authUtil.successTrue(statusCode.BAD_REQUEST, responseMessage.SORT_UNKNOW));
    }
    const soltedPost = await sortPost(sortBy, address);
    const post = await manyPost(soltedPost);
    
     const start = (page - 1) * pageSize;
     const end = start + parseInt(pageSize);
     const result = post.slice(start, end);
    return res.status(200).send(
      authUtil.successTrue(statusCode.OK, responseMessage.SUCCESS_SORT,result)
    )
    
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.FALSE_SORT
        )
      );
  }
};

module.exports = postFilter;
