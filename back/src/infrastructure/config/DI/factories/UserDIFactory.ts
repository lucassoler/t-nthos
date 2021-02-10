import UserRepository from "../../../../domain/repositories/UserRepository";
import InMemoryUserRepository from "../../../repositories/inmemory/InMemoryUserRepository";
import { JaneUser } from "../examples/UserExemples";


export default class UserDIFactory {
    private static instance:UserDIFactory;
    private repository:UserRepository;

    constructor() {
        switch (process.env.MODE) {
            default:
                this.repository = this.loadContentInMemoryLoader()
        }
    }
    static userRepository(): UserRepository {
        if (!this.instance) {
            this.instance = new UserDIFactory();
        }

        return this.instance.repository;
    }

    private loadContentInMemoryLoader(): UserRepository {
        return new InMemoryUserRepository([JaneUser]);
    }
}