/**
 * This file is used to validating data using validatorjs package
 */

export default {
    id: 'required|string',
    emails: {
        bookingConfirmationSent: 'boolean',
        checkInInfosSent: 'boolean'
    },
    pinCodes: {
        mainDoorCode: 'required|numeric',
        roomDoorCode: 'required|numeric'
    }
}