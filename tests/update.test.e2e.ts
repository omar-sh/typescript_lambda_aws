import { binding, then, when ,given} from 'cucumber-tsflow';
import { expect } from 'chai';
import { getApiGatewayUrl } from 'serverless-plugin-test-helper';
import axios from 'axios';
const URL = getApiGatewayUrl();

@binding()
export class UpdateTestE2e {
    private response: any;

    @given(/reservation object/)
    public async resevationObject() {
        this.response  = (await axios.post(`${URL}/reservation/create`,{
            "emails": {
                "bookingConfirmationSent": true,
                "checkInInfosSent": true
            },
            "pinCodes": {
                "mainDoorCode": 3,
                "roomDoorCode": 1
            }
        })).data.result.message

    }

    @when(/update the reservation/)
    public async updateReservation() {
        this.response = (await axios.put(`${URL}/reservation/update/${this.response.id}`,{
            "emails": {
                "bookingConfirmationSent": false,
                "checkInInfosSent": false
            },
            "pinCodes": {
                "mainDoorCode": 4,
                "roomDoorCode": 2
            }
        })).data.result.message;
    }

    @then(/reservation should be updated/)
    public async checkReservation() {
        this.response = (await axios.get(`${URL}/reservation/get/${this.response.id}`)).data.result.message;
        expect(this.response.pinCodes.roomDoorCode).to.equal(
            2
        );
        expect(this.response.pinCodes.mainDoorCode).to.equal(
            4
        );
        expect(this.response.emails.checkInInfosSent).to.equal(
            false
        );
        expect(this.response.emails.bookingConfirmationSent).to.equal(
            false
        );

    }
}
