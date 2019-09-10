import con from '../config/db-connection';
import { UserDto } from '../dto/user-dto';
import * as dotenv from 'dotenv';

dotenv.config();

class UserDao {

    getUserByUserNamePassword(userName: string, password: string): Promise<UserDto[]> {
        const sql = " SELECT id userId,name userName,`role`  FROM user where name = ?  and password=? ";
        return new Promise((resolve, rejects) => {
            con.query(sql, [userName, password], (error, result) => {
                if (error) rejects(error.message);
                resolve(result);
            });
        });
    }
}
export default new UserDao();