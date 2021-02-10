export default interface AuthLoader {
    signIn(email:string, password:string):Promise<string>;
};
