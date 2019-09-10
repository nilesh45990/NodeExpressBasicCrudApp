import * as sinon from 'sinon';
import chai from 'chai';
import employeeDao from '../../dao/employee-dao';
const empJson = require('../../test/employee/employee-response.json');
import { Employee } from '../../model/employee';

describe("Test Employee Service layer", () => {

    it('should return list of employees', async () => {
        // sinon.stub(employeeDao, 'getAllEmployee').returns(new Promise((resolve) => resolve(empJson)));
        // const employeeList: Employee[] = await employeeDao.getAllEmployee();
        // chai.expect(employeeList[0].empName).to.eql('nilesh chauhan');
        let mock = sinon.mock(employeeDao);
        mock.expects('getAllEmployee').resolves(empJson);
        const employeeList: Employee[] = await employeeDao.getAllEmployee();
        mock.verify();
    });

    it("should return employee by given employee id", async () => {
        sinon.stub(employeeDao, 'getEmployeeById').resolves(empJson);
        const employee: Employee[] = await employeeDao.getEmployeeById('1');
        chai.expect(employee[0].empName).to.eql('nilesh chauhan');
    });

    it("should return employee object with generated employee id", () => {
        let object = {
            empName: "nilesh chauhan",
            empEmail: "nilesh.chauhan@gmail.com",
            empContact: "9924111345"
        }
        sinon.stub(employeeDao, 'saveEmployee').resolves(1);
        const employeeId: Promise<number> = employeeDao.saveEmployee(<Employee>object);
        chai.expect(employeeId).to.eql(1);
    });

    it("should return success message on updated", async () => {
        let object = {
            empId: 1,
            empName: "Nilesh chauhan",
            empEmail: "nilesh.chauhan@pmcretail.com",
            empContact: "9586913482"
        }
        sinon.stub(employeeDao, 'updateEmployee').resolves("Employee updated successfully!");
        const msg: string = await employeeDao.updateEmployee(<Employee>object);
        chai.expect(msg).to.eql('Employee updated successfully!');
    });

    it("should return success message on deleted", async () => {
        sinon.stub(employeeDao, 'deleteEmployee').resolves("Employee deleted successfully!");
        const msg: string = await employeeDao.deleteEmployee('1');
        chai.expect(msg).to.eql('Employee deleted successfully!');
    });
});