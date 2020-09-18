import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import crudService from '../crud/crud.service';
import * as Validator from 'validatorjs';
import reservationPut from '../rules/reservationPut'
import {generateResponse, removeAdditionalAttrsFromObject} from "../utils/helpers";
import {Reservation} from "../interfaces/reservation";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    let data: Reservation = removeAdditionalAttrsFromObject(JSON.parse(event.body), reservationPut);
    const id = event.pathParameters ? event.pathParameters.id : '';
    try {
        if (!id)
            return generateResponse({message: 'Please  pass the reservation id', statusCode: 400}, 400);

        const validation = new Validator(data, reservationPut);
        if (validation.fails())
            return generateResponse({message: 'Validation errors', errors: validation.errors, statusCode: 400}, 400);

        const checkForExistance = await crudService.get(id);

        if (!Object.keys(checkForExistance).length)
            return generateResponse({message: 'Item could not be found', statusCode: 404}, 404);

        const result = (await crudService.update(id, data)).Attributes;
        return generateResponse({message: result, statusCode: 200}, 200);
    } catch (e) {
        console.log(e);
        return generateResponse({err: '500 server Error'}, 500);
    }
};