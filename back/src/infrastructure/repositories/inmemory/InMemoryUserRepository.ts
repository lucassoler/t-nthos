import User from "../../../domain/entities/User";
import UserRepository from "../../../domain/repositories/UserRepository";

export default class InMemoryUserRepository implements UserRepository {
    constructor(private users:User[]) {

    }

    verify(token:string):Promise<void> {
        const user:User | undefined = this.users.find(u => u.token === token);
        if (!user) throw new Error("invalid token");
        return Promise.resolve();
    }
    
    signIn(email:string, password:string):Promise<string> {
        const user:User | undefined = this.users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error("invalid email or password");
        user.token = 'TOKEN';
        return Promise.resolve(user.token);
    }
};
