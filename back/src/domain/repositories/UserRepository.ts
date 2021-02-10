export default interface UserRepository {
    signIn(email:string, password:string):Promise<string>;
    verify(token:string):Promise<void>;
};
