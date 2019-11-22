import * as mysql from 'mysql';
class DBConneciton {
    static Connection: mysql.Connection;
    private constructor() {
    }
    public static getDbConnection(): mysql.Connection {
        if (this.Connection) {
            return this.Connection;
        }
        this.Connection = mysql.createConnection(`mysql://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.DATABASE_URL}/${process.env.DATABASE}`);
        this.Connection.connect((err) => {
            if (err) console.error(err);
            console.log("MySql db connected successfully");
        });
        return this.Connection;
    }
}

export default DBConneciton.getDbConnection();