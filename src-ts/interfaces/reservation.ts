/**
 * Interfaces which I used for reservation objects
 */

interface Email {
    bookingConfirmationSent?: Boolean;
    checkInInfosSent?: Boolean;
}

interface PinCodes {
    mainDoorCode: number;
    roomDoorCode: number;
}


export interface Reservation {
    id: String;
    emails?: Email;
    pinCodes: PinCodes
}