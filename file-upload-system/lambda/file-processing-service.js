const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const util = require('./util');

const bucketName = 'ts-file-upload-bucket';
const s3Subfolder = 'data';

const process = async (requestBody) => {
    const fileName = requestBody.split('\r\n')[1].split(';')[2].split('=')[1].replace(/^"|"$/g, '').trim();
    let fileContent = requestBody.split('\r\n')[4].trim();

    fileContent += `\n\n Process Timestamp: ${new Date().toISOString()}`

    const params = {
        Bucket: bucketName,
        Key: `${s3Subfolder}/${fileName}`,
        Body: fileContent
    }

    await s3.putObject(params).promise();
    return util.buildResponse(200);
}

module.exports.process = process;