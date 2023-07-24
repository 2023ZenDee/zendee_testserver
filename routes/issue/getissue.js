const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const getIssue = async(req, res) => {
    try{
        const { latitude, longitude} = req.query;

        const filteringIssue = await prisma.post.findMany({
            where: {
                latitude : {
                    gte : parseFloat(latitude)- 0.02,
                    lte : parseFloat(latitude) + 0.02,
                },
                longitude: {
                    gte : parseFloat(longitude) - 0.02,
                    lte : parseFloat(longitude) + 0.02,
                },
                deleted_at: {
                    not : new Date(),
                }
            }
        });
        //현지 위치에서 2km 반경 이내에 게시물 필터링
        res.status(200).send({
            message : "게시물 조회 성공",
            data : {
                filteringIssue
            }
        })
    }catch(err){
        console.error(err);
        res.status(500).send({ message : '게시물 조회 실패'});
    }
    
}

module.exports = getIssue