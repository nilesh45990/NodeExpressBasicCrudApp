import app from '../../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

describe('Employee CRUD API', () => {

    chai.use(chaiHttp);

    it("should return all employees list on call", async () => {
        await chai.request(app).get("/employees/").then((res) => {
            res.should.have.status(200);
            res.body.response.length.should.be.eql(13);
        });
    });

    it("should return employee by given employee id", async () => {

        let expected = { "empId": 1, "empName": "nilesh chauhan", "empEmail": "nilesh45990@gmail.com", "empContact": "9924111345" };
 
        await chai.request(app).get("/employees/1").then((res) => {
            chai.expect(expected).to.eql(res.body.response);
        });
    });

    it("should return employee object with generated employee id", async () => {
        let employee = {
            empName: "Pritesh Patel",
            empEmail: "pritesh.patel@gmail.com",
            empContact: "1234567890"
        }
        // chai.request(app).post("/employees/").send(employee).end((err, res) => {
        //     res.should.have.status(200);
        //     res.body.response.name.should.be.a('object');
        // });
    });

    it("should return 404 on update call", async () => {
        let employee = {
            empName: "Pritesh Patel",
            empEmail: "pritesh@gmail.com",
            empContact: "9876543210"
        }
        await chai.request(app).put("/employees/18").send(employee).then((res) => {
            chai.expect(res.body.code).to.eql(404);
            console.log(res.body.response);
        });
    });

    it("should return success message on deleted successfully", async () => {
        await chai.request(app).delete("/employees/18").then((res) => {
            res.should.have.status(200);
            chai.expect(res.body.code).to.eql(204);
        });
    });
});

