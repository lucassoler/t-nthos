import express, { Request, Response } from "express";
import { Dependencies } from "../../../infrastructure/config/dependencies";
import AuthController from "../controllers/AuthController";

export default ((dependencies:Dependencies) => {
    const authRouter = express.Router();

    authRouter.route('/login')
        .post((req:Request, res:Response) => {
            new AuthController(dependencies).signIn(req, res);
        });

    return authRouter;
});