import Usecase from "../../common/Usecase";
import User from "../../domain/entities/User";
import UserRepository from "../../domain/repositories/UserRepository";

export default class SignIn extends Usecase {
    constructor(private userRepository:UserRepository) {
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

            const token:string = await this.userRepository.signIn(email, password);

            return this.succeed(token);
        } catch (error) {
            return this.failure(error);
        }
    }
};
