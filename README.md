## Create a new lambda function

1. Create a new Lambda function
2. Under the Lambda function handler and role section, click Create new role from template(s).
3. Enter the Role name - alexa-lambda-with-dynamodb
4. From the Policy templates, select Simple Microservice permissions.

## Grant DynamoDB permissions via IAM:

1. From the AWS console, click on IAM
2. Locate and click on the role you use with your Lambda functions, such as lambda_basic_execution
3. Click the "Attach Policy" button
4. For a quick demo, filter on "DynamoDB" and attach the AmazonDynamoDBFullAccess policy (For a production scenario, choose a more fine-grained policy granting access to certain resources).

## Inside exports.handler
```javascript
  alexa.dynamoDBTableName = 'lastHaircut';
```

## Inside your Intent handler
```javascript
this.emit(':tellWithCard', outputSpeech,"Last Haircut",outputSpeech);
this.emit(':saveState', true);
```
