import Usecase from "../../common/Usecase";
import AuthLoader from "../../domain/loaders/AuthLoader";

export default class SignIn extends Usecase {
    constructor(private authLoader:AuthLoader) {
        super();
    }

    async Execute(email:string, password:string) {
        try {
            if (email === '') {
                throw new Error("email is required");
            }
            if (password === '') {
                throw new Error("password is required");
            }
            
            const token:string = await this.authLoader.signIn(email, password);

            localStorage.setItem('token', token);

            return this.succeed(token);
        } catch (error) {
            return this.failure(error);
        }
    }
};
