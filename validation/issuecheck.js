const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

module.exports = {
    validationIssue : async(posterIdx) =>{
        const issue = await prisma.post.findUnique({
            where : {
                postIdx : posterIdx
            }
        })
        if(!issue){
            return true;
        }
        return false;
    }
}