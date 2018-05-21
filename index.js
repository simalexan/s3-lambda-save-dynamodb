const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid/v4');
const parseS3Event = require('./parse-s3-event');
const TABLE_NAME = process.env.TABLE_NAME;
const PRIMARY_KEY = process.env.PRIMARY_KEY;

exports.handler = (event) => {
    let S3Objects = parseS3Event(event);
    return Promise.all(S3Objects.map(saveToDynamoDB));
};

saveToDynamoDB = (data) => {
    if (!data) {
        return Promise.resolve();
    }
    data[PRIMARY_KEY] = uuidv4();
    let params = {
        TableName: TABLE_NAME,
        Item: data
    }
    return docClient.put(params)
        .promise()
        .then(response => response)
        .catch(err => {
            console.log(err);
            return err;
        });
};