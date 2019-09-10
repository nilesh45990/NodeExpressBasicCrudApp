import * as express from 'express';
import * as sinon from 'sinon';
import assert from 'assert';
import chai from 'chai';
import retailerDao from '../../dao/retailer-dao';
import retailerService from '../../service/retailer-service';
const retailer_fake_response = require('../../test/retailer/retailer-response.json');
import { RetailerDto } from '../../dto/retailer-dto';
import { GenericResponse, StatusCode } from '../../util/generic-response';

describe("Retailer service layer test", () => {
    let mock: sinon.SinonMock;
    before('setting dao as mock', () => {
        mock = sinon.mock(retailerDao);
    });

    it('should return list of retailers', async () => {
        mock.expects('getAllRetailer').resolves(await retailer_fake_response);
        const retailerList: GenericResponse<RetailerDto[]> = await retailerService.getAllRetailer();
        assert.equal(2, retailerList.getResponse().length);
    });

    it("should return retailer by given document id", async () => {
        mock.expects('getRetailerById').resolves(await retailer_fake_response);
        const retailers: GenericResponse<RetailerDto> = await retailerService.getRetailerById('1');
        const retailer: RetailerDto = <RetailerDto>retailers.getResponse();
        chai.expect('nilesh').to.eql(retailer.name);
    });

    it("should save object and return object with generated retailer id", async () => {
        mock.expects('saveRetailer').resolves(await retailer_fake_response[0]);
        const request: express.Request = express.request;
        request.body = retailer_fake_response[0];
        const retailerDto = await retailerService.saveRetailer(request);
        assert.equal(retailerDto.getCode(), 201);
    });

    it("should update object and return success message on updated", async () => {
        mock.expects('getRetailerById').resolves(await retailer_fake_response);
        mock.expects('updateRetailer').resolves("Retailer is updated successfully!");
        const request: express.Request = express.request;
        request.body = retailer_fake_response[0];
        request.params = { "retailerId": "1" };
        const message: GenericResponse<RetailerDto> = await retailerService.updateRetailer(request);
        chai.expect("Retailer is updated successfully!").to.eql(message.getMessage());
    });

    it("should delete object and return success message on deleted", async () => {
        mock.expects('getRetailerById').resolves(await retailer_fake_response);
        mock.expects('deleteRetailer').resolves("Retailer is deleted successfully!");
        const message = await retailerService.deleteRetailer('1');
        chai.expect('Retailer is deleted successfully!').to.eql(message.getMessage());
    });
});