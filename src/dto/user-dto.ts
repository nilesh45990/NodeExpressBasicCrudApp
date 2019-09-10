export class UserDto {
    private _userId: number;
    private _userName: string;
    private _password: string;

    public get userId(): number {
        return this._userId;
    }
    public set userId(userId: number) {
        this._userId = userId;
    }
    public get userName(): string {
        return this._userName;
    }
    public set userName(userName: string) {
        this._userName = userName;
    }
    public get password(): string {
        return this._password;
    }
    public set password(password: string) {
        this._password = password;
    }

}