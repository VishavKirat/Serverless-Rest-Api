'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const params = {
        TableName: 'todos',
        key:{
            id: event.pathParameters.id
        }
    };
    
    dynamodb.get(params,(error, result) =>{
        
          
        if(error){
            console.erroe(error);
            callback(new Error('Couldnot create the recipe'));
            return;
        }
        
        const response = {
            statusCode:200,
            body: JSON.stringify(result.Items)
        };
        callback(null,response);
    });
}