const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const issue = async (req, res) => {
  const { title, content, postImg, lat, lng } = req.body;
  const userId = req.user.userId;
  //console.log(userId);
  try {
    const createBoard = await prisma.post.create({
      data: {
        title,
        content,
        postImg,
        longitude: lng,
        latitude: lat,
        author : {connect : {userId : userId}}
      },
    });
    res.status(200).json({
      ok: true,
      message: '게시물이 성공적으로 업데이트 되었습니다.',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      ok: false,
      message: err.message,
    });
  }
};

module.exports = issue;
