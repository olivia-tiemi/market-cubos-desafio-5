const aws = require('aws-sdk')

const s3 = new aws.S3({
  endpoint: new aws.Endpoint(process.env.BACKBLAZE_ENDPOINT),
  credentials: {
    accessKeyId: process.env.BACKBLAZE_KEYID,
    secretAccessKey: process.env.BACKBLAZE_APPKEY
  }
})

module.exports = s3
