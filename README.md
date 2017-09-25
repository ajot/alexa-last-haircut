## Create a new lambda function

1. Create a new Lambda function, using the blueprint 'alexa-skill-kit-sdk-factskill'
2. Choose the trigger as "Alexa Skills Kit"
3. Give the function a name
4. Copy/paste the code from [index.js](https://github.com/ajot/alexa-last-haircut/blob/master/index.js) in the code window
5. Under the Lambda function handler and role section, click on the Role dropdown, and choose 'Create new role from template(s)'.
6. Give the Role a name, say - alexa-lambda-with-dynamodb
7. From the Policy templates, select Simple Microservice permissions.

## Grant DynamoDB permissions via IAM:

1. From the AWS console, click on IAM
2. Click on Roles
3. Locate and click on the role you use with your Lambda functions, such as lambda_basic_execution
4. Click the "Attach Policy" button
5. For a quick demo, filter on "DynamoDB" and attach the AmazonDynamoDBFullAccess policy (For a production scenario, choose a more fine-grained policy granting access to certain resources).

## Inside exports.handler
```javascript
  alexa.dynamoDBTableName = 'lastHaircut';
```

## Inside your Intent handler
```javascript
this.emit(':tellWithCard', outputSpeech,"Last Haircut",outputSpeech);
this.emit(':saveState', true);
```
