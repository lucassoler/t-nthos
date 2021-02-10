import AuthLoader from "../../../domain/loaders/AuthLoader";

export default class InMemoryAuthLoader implements AuthLoader {
    validEmail:string = 'jane@gmail.com';
    validPassword:string = 'azerty';
    async signIn(email:string, password:string):Promise<string> {
        if (email !== this.validEmail) throw new Error("invalid email or password");
        if (password !== this.validPassword) throw new Error("invalid email or password");
        
        return Promise.resolve('ToKEN');
    }
};
