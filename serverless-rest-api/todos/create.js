'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid')
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON().parse(event.body);
    
    if(typeof data.text !== 'string'){
        console.error('Validation Failed it is nota string');
        callback(new Error('Couldnot create the recipe list'));
    }
    
    const params= {
        TableName: 'todos',
        Item: {
            id: uuid.v1(),
            text: data.text,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    }
    
    dynamodb.put(params, (error,result) =>{
        
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

