import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import crudService from '../crud/crud.service';
import * as Validator from 'validatorjs';
import reservationPut from '../rules/reservationPut'
import {generateResponse} from "../utils/helpers";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters ? event.pathParameters.id : '';
    try {
        if (!id)
            return generateResponse({err: 'Please  pass the reservation id'}, 400);
        const response = await crudService.get(id);
        const item = Object.keys(response).length === 0 ? {} : response.Item;
        return generateResponse({message:item, statusCode: 200}, 200);
    } catch (e) {
        console.log(e);
        return generateResponse({err: '500 server Error'}, 500);
    }
};