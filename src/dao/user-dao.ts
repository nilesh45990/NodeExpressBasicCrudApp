import { bucket, N1qlQuery } from '../config/connection'
import { UserDto } from '../dto/user-dto';
import * as dotenv from 'dotenv';

dotenv.config();

class UserDao {

    getUserByUserNamePassword(userName: string, password: string): Promise<UserDto[]> {
        const sql = N1qlQuery.fromString(" SELECT id userId,userName,`role`  FROM demo  where type='user' and userName = $1  and pwd=$2 ");
        return new Promise((resolve, rejects) => {
            bucket.query(sql, [userName, password], (error, result) => {
                console.log(error);
                if (error) rejects(error.message);
                console.log(result);
                resolve(result.map(result => result));
            });
        });
    }
}
export default new UserDao();