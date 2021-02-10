import AuthLoader from "../../../domain/loaders/AuthLoader";
import RESTClient from "./RESTClient";

export default class RESTAuthLoader implements AuthLoader {
    constructor(private http:RESTClient) {

    }

    async signIn(email:string, password:string):Promise<string> {
        const result: { token:string } = await this.http
            .post<{ token:string }>(process.env.REACT_APP_REST_ENDPOINT + '/auth/login', null, { email, password }).toPromise();

        
        return Promise.resolve(result.token);
    }
};
