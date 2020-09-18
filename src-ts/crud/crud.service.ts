import {Reservation} from "../interfaces/reservation";
import * as AWS from "aws-sdk";
import {generateUpdateExpression} from '../utils/helpers';
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import PutItemInput = DocumentClient.PutItemInput;

/**
 *   CRUD SERVICE contains all logic for crud operations inside dynamodb
 */

class CRUD {

    docClient: DocumentClient;

    constructor() {
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    async create(object: Reservation): Promise<any> {
        let params = {
            TableName: "ReservationTable",
            Item: object,
            ReturnValues: "ALL_OLD"
        };
        try {
            await this.docClient.put(params).promise();
            return object;
        } catch (e) {
            console.log('Server Error [500]', e);
            throw new Error('Server Error [500]');
        }
    }

    async update(id: String, object: Reservation): Promise<any> {
        const {arr, ExpressionAttributeValues} = generateUpdateExpression(object);
        let params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
            TableName: "ReservationTable",
            Key: {
                id: id
            },
            UpdateExpression: `set ${arr.join(', ')}`,
            ExpressionAttributeValues: ExpressionAttributeValues,
            ReturnValues: "ALL_NEW"
        };
        return new Promise((resolve, reject) => {
            this.docClient.update(params, function (err, data) {
                if (err)
                    return reject(err);
                return resolve(data);
            })

        })
    }

    async get(id: String): Promise<any> {
        try {
            let params = {
                TableName: "ReservationTable",
                Key: {
                    id
                }
            };
            return this.docClient.get(params).promise();
        } catch(e){
            console.log('Server Error [500]', e);
            throw new Error('Server Error [500]');
        }
    }

}

export default new CRUD();

