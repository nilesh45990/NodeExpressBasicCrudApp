import userDao from '../dao/user-dao';
import { Router, Request, Response } from 'express';
import { GenericResponse, StatusCode } from '../util/generic-response';
import { UserDto } from '../dto/user-dto';
class UserService {
    async getUserByUserNamePassword(req: Request): Promise<GenericResponse<UserDto>> {
        try {
            const userName: string = req.body.userName;
            const password: string = req.body.password;
            const users: UserDto[] = await userDao.getUserByUserNamePassword(userName, password);
            if (!users.length) {
                return new GenericResponse<UserDto>().setCode(StatusCode.NOT_FOUND).setResponse(['Invalid credentials.. Please try again!']);
            }
            return new GenericResponse<UserDto>().setResponse(users[0]);
        } catch (error) {
            return new GenericResponse<UserDto>().setResponse(error).setCode(StatusCode.ERROR);
        }
    }
}
export default new UserService();