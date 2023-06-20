const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const issues = async (req, res) => {
  const { title, content, postImg, lat, lng } = req.body;
  try {
    const createBoard = await prisma.post.create({
      data: {
        title,
        content,
        postImg,
        longitude: lng,
        latitude: lat,
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

module.exports = issues;
