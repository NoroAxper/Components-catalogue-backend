const S3 = require('aws-sdk/clients/s3')
require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY
const accessKey = process.env.AWS_BUCKET_SECRET_KEY
console.log(bucketName)
const s3 = new S3({
  region,
  secretAccessKey: accessKey,
  accessKeyId
})
async function uploadFile(fileData) {
  const params = {
    Bucket: bucketName,
    Key: `${Date.now()}_${fileData.originalname}`,
    Body: fileData.buffer,
    ContentType: fileData.mimetype
  }

  return s3.upload(params).promise()
}
exports.uploadFile = uploadFile

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return new Promise((resolve, reject) => {
    const readStream = s3.getObject(downloadParams).createReadStream()
    readStream.on('error', (error) => {
      reject(error)
    })

    readStream.on('end', () => {
      // Handle any cleanup or additional logic
    })

    resolve(readStream)
  })
}
exports.getFileStream = getFileStream
