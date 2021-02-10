import Usecase from "../../common/Usecase";
import UserRepository from "../../domain/repositories/UserRepository";

export default class VerifyUser extends Usecase {
    constructor(private userRepository:UserRepository) {
        super();
    }

    async Execute(token:string) {
        try {
            await this.userRepository.verify(token);
            
            return this.succeed();
        } catch (error) {
            return this.failure(error);
        }
    }
}