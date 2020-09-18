import { binding, then, when } from 'cucumber-tsflow';
import { expect } from 'chai';
import { getApiGatewayUrl } from 'serverless-plugin-test-helper';
import axios from 'axios';
const URL = getApiGatewayUrl();

@binding()
export class CreateTestE2e {
    private response: any;

    @when(/we create a reservation/)
    public async createReservation() {
         this.response = (await axios.post(`${URL}/reservation/create`,{
             "emails": {
                 "bookingConfirmationSent": true,
                 "checkInInfosSent": true
             },
             "pinCodes": {
                 "mainDoorCode": 3,
                 "roomDoorCode": 1
             }
         })).data.result.message;
    }

    @then(/the response should be the newly created object/)
    public async getReservation() {
        this.response = (await axios.get(`${URL}/reservation/get/${this.response.id}`)).data.result.message;
        expect(this.response.pinCodes.roomDoorCode).to.equal(
            1
        );
        expect(this.response.pinCodes.mainDoorCode).to.equal(
            3
        );
        expect(this.response.emails.checkInInfosSent).to.equal(
            true
        );
        expect(this.response.emails.bookingConfirmationSent).to.equal(
            true
        );

    }
}
