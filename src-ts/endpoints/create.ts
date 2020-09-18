import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import * as uuid from 'uuid';
import crudService from '../crud/crud.service';
import * as Validator from 'validatorjs';
import reservationPost from '../rules/reservationPost'
import {generateResponse, removeAdditionalAttrsFromObject} from "../utils/helpers";
import {Reservation} from "../interfaces/reservation";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    let data: Reservation = removeAdditionalAttrsFromObject(JSON.parse(event.body), reservationPost);
    data = {
        ...data,
        id: uuid.v1()
    };
    const validation = new Validator(data, reservationPost);
    if (validation.fails())
        return generateResponse({message: 'Validation errors', errors: validation.errors, statusCode: 400}, 400);
    const result = await crudService.create(data);
    return generateResponse({message: result, statusCode: 200}, 200);
};