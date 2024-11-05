import creds from '../creds/creds.json'
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const CREDENTIAL = {
    accessKeyId: creds.accessKeyId,
    secretAccessKey: creds.secretAccessKey,
  };
const dynamo_client = new DynamoDBClient({region: 'us-east-1'
    ,     credentials: CREDENTIAL
});
 
export default dynamo_client;