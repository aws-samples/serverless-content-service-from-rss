/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

const AWS = require('aws-sdk')
AWS.config.update({region: process.env.AWS_REGION})
const documentClient = new AWS.DynamoDB.DocumentClient()

const FeedParser = require('feedparser')
const fetch = require('node-fetch')  
const req = fetch(process.env.Feed)

const feedparser = new FeedParser()

let services = [
    'aws-lambda',
    'amazon-eventBridge',
    'aws-x-ray',
    'aws-step-functions',
    'amazon-sns',
    'amazon-sqs',
    'amazon-s3',
    'aws-amplify',
    'amazon-dynamodb'
]

const saveToDDB = async (items) => {
  console.log(items)
  await Promise.all(items.map(async (item) => {
    const result = await documentClient.put({
      TableName: process.env.TableName,
      Item: {
        PK: 'launch',
        SK: item.pubDate,
        link: item.link,
        service: item.service,
        title: item.title,
        description: item.description,
        author: item.author
      }
    }).promise()
  }))
}


exports.handler = async (event) => {
  const items = await getItemsFromFeed()
  await saveToDDB(items)
}

const getItemsFromFeed = async () => {
  let items = []

  return new Promise(async (resolve, reject) => {
    
    const getServerlessService = (category) => {
        if (!category) return ''
  
        for (let i = 0; i < services.length; i++) {
            let service = services[i]
            if (category.search(service) > 0 ) return service
        }
        return ''
    }
  
    req.then(function (res) {
      if (res.status !== 200) {
        throw new Error('Bad status code')
      }
      else {
        // The response `body` -- res.body -- is a stream
        res.body.pipe(feedparser)
      }
    }, function (err) {
        console.error('Error: ', err)
        reject(err)
    })
    
    feedparser.on('error', function (error) {
      console.error('Error: ', error)
    })
    
    feedparser.on('readable', function () {
  
      let stream = this  // `this` is `feedparser`, which is a stream
      let item 
  
      while (item = stream.read()) {
        const service = getServerlessService(item.categories[0])
        if (service) {
            console.log(service, item.link)
            items.push({
                link: item.link,
                pubDate: new Date(item.pubDate).getTime(),
                service,
                title: item.title,
                description: item.description,
                author: item.author
            })
        }
      }
    })
  
    feedparser.on('end', function() {
        console.log('done')
        resolve(items)
    })
  })

}