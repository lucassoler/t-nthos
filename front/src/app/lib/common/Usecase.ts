export default abstract class Usecase {
    error: Error | null;
    errors: Error[] | null;
    result: any;
    constructor() {
        this.error = null;
        this.errors = null;
        this.result = null;
    }
    protected succeed(result?:any):Promise<{error:Error | null, errors:Error[] | null, succeed:any}> {
        this.result = result;

        return Promise.resolve({
            error: null,
            errors: null,
            succeed: this.result
        })
    }

    protected failure (error:Error):Promise<{error:Error | null, errors:Error[] | null, succeed:any}> {
        this.error = error;
        return Promise.resolve({
            error: this.error,
            errors: null,
            succeed: null
        })
    }
}