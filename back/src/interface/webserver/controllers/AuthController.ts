import { Dependencies } from "../../../infrastructure/config/dependencies";
import { Request, Response } from "express";
import SignIn from "../../../application/usecases/SignIn";

export default class AuthController {
    dependencies:Dependencies;

    constructor(dependencies:Dependencies) {
        this.dependencies = dependencies;
    }


    async signIn(req:Request, res:Response) {
        const signIn:SignIn = new SignIn(this.dependencies.userRepository);
        const result = await signIn.Execute(req.body.email, req.body.password);

        if (result.error) {
            if (result.error.message === 'invalid email or password') {
                return res.status(401).json({ error: result.error.message });
            }

            return res.status(400).json({ error: result.error.message });
        }

        return res.status(200).json({ token: result.succeed });
    }
}