import {Reservation} from '../interfaces/reservation';

export const generateResponse = (body: Object, statusCode: number) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify({
            result: body
        })
    }
};


export const removeAdditionalAttrsFromObject = (object: any, rules: any, finalObject: Reservation = <Reservation>{}): Reservation => {
    for (let attr in  object) {
        // if type object go into recursion to append attributes
        if (rules[attr] && typeof(object[attr]) == 'object')
            finalObject = {...{[attr]: removeAdditionalAttrsFromObject(object[attr], rules[attr], <Reservation>{}), ...finalObject}};
        //otherwise append attributes
        else if (rules[attr])
            finalObject = {[attr]: object[attr], ...finalObject};
    }
    // return object of type Reservation
    return <Reservation>finalObject;
};

export const generateUpdateExpression = (object: any, lastKey: String = ''):  any => {
    let arr: String[] = [];
    let ExpressionAttributeValues = {};
    for (let key in object) {
        if (typeof(object[key]) == 'object') {
            const {arr: newArr, ExpressionAttributeValues : newExpObject} = generateUpdateExpression(object[key], `${lastKey ? `${lastKey}.` : ''}${key}`);
            arr = [...arr, ...newArr];
            ExpressionAttributeValues = {...ExpressionAttributeValues, ...newExpObject}
        }
        else {
            let keyAttribute =  `${lastKey ? `${lastKey}.` : ''}${key}`;
            let newKeyAttribute =`${lastKey ? `${lastKey}` : ''}${key}`;
            arr = [...arr, `${keyAttribute} = :${newKeyAttribute}`]
            ExpressionAttributeValues = {...ExpressionAttributeValues,  [`:${newKeyAttribute}`]: object[key] }
        }
    }
    return {arr, ExpressionAttributeValues};
};