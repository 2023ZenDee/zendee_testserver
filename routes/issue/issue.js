const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const issue = async (req, res) => {
  const { title, content, postImg, lat, lng, tag } = req.body;
  const userId = req.user.userId;

  const validTags = ['위험', '안내', '속보'];
  if (!validTags.includes(tag)) {
    return res.status(400).send({
      message: '유효하지 않은 태그입니다.',
    });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        postImg,
        longitude: parseFloat(lng),
        latitude: parseFloat(lat),
        user: { connect: { userId: userId } },
        deleted_at: new Date(Date.now() + 72 * 60 * 60 * 1000),
        updated_at: new Date(),
        tags: {
          create: {
            tag: {
              create: {
                tagName: tag,
              },
            },
          },
        },
      },
      include: {
        tags: true,
      },
    });

    res.status(200).json({
      ok: true,
      message: '게시물이 성공적으로 업데이트되었습니다.',
      data: newPost,
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
