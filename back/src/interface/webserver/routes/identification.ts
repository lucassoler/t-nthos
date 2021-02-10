import express, { Request, Response } from "express";
import { Dependencies } from "../../../infrastructure/config/dependencies";
import IdentificationController from "../controllers/IdentificationController";

export default ((dependencies:Dependencies) => {
    const identificationRouter = express.Router();

    identificationRouter.route('/')
        .get((req:Request, res:Response) => {
            new IdentificationController(dependencies).all(req, res);
        });
    identificationRouter.route('/:identificationId')
        .put((req:Request, res:Response) => {
            new IdentificationController(dependencies).update(req, res);
        });

    return identificationRouter;
});