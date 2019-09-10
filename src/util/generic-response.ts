export enum StatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    NOT_FOUND = 404,
    ERROR = 400
}
export class GenericResponse<T> {
    private code: number = StatusCode.OK;
    private message: string;
    private response: T | string[];

    public getCode() {
        return this.code;
    }
    public setCode(code: number) {
        this.code = code;
        return this;
    }
    public getMessage() {
        return this.message;
    }
    public setMessage(message: string) {
        this.message = message;
        return this;
    }

    public getResponse() {
        return this.response;
    }
    public setResponse(response: T | string[]) {
        this.response = response;
        return this;
    }
}
// export default new GenericResponse();