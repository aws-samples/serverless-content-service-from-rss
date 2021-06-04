/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

const AWS = require('aws-sdk')
AWS.config.update({region: process.env.AWS_REGION})
const documentClient = new AWS.DynamoDB.DocumentClient()

// Returns list of items from DynamoDB table, limited by the *Limit* attribute.

const query = async () => {
  const data = await documentClient.query({
    TableName: process.env.TableName,
    Limit: 100,
    ExpressionAttributeValues: {
        ':pk': 'launch' 
    },
    KeyConditionExpression: 'PK = :pk',
    ScanIndexForward: false
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}

exports.handler = async (event) => {
    return await query()
}