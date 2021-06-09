
# Dynamic content service with RSS parser

This example application shows how to build a serverless application that fetches data from an external data on a schedule, then serves the content to CloudFront domain name via an API Gateway endpoint.

To learn more about how this application works, see the blog post at: https://acloudguru.com/blog/engineering/serving-dynamic-website-content-with-serverless-architecture

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the [AWS Pricing page](https://aws.amazon.com/pricing/) for details. You are responsible for any AWS costs incurred. No warranty is implied in this example.

```bash
.
├── README.MD              <-- This instructions file
├── getItems               <-- Retrieves items from the DynamoDB table
├── parser                 <-- Parses an RSS feed and stores the items in the DynamoDB table
```

## Requirements

* An AWS account. ([Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and login.)
* AWS CLI already configured with Administrator permission
* [AWS SAM CLI installed](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) 
* [NodeJS 14.x installed](https://nodejs.org/en/download/)

## Installation Instructions

1. Clone the repo onto your local development machine:
```
git clone https://github.com/aws-samples/TBD
cd TBD
```

2. From the command line, install the application's using the AWS SAM template:
```
sam build
sam deploy --guided 
```
During the prompts, enter `dynamic-web-content` for the stack name, enter your preferred Region, and accept the defaults for the remaining questions.

## Cleanup

Use the CloudFormation console to delete all the stacks deployed.

If you have any questions, please contact the author or raise an issue in the GitHub repo.

==============================================

Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

SPDX-License-Identifier: MIT-0

