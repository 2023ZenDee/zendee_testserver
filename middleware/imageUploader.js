const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3()

const imageUploader = multer({
    storage : multerS3({
        s3 : s3,
        bucket : 'zendee1',
        key : (req,file, callback) =>{
            const uploadDirectory = req.query.directory
            callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`)
        },
        acl : 'public-read-write'
    })
})

module.exports = imageUploader;