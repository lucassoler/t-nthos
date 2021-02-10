import { Dependencies } from "../../../infrastructure/config/dependencies";
import { Request, Response } from "express";
import SignIn from "../../../application/usecases/SignIn";
import FetchIdentifications from "../../../application/usecases/FetchIdentifications";
import UpdateIdentification from "../../../application/usecases/UpdateIdentification";

export default class IdentificationController {
    dependencies:Dependencies;

    constructor(dependencies:Dependencies) {
        this.dependencies = dependencies;
    }


    async all(req:Request, res:Response) {
        const fetchIndetification:FetchIdentifications = new FetchIdentifications(this.dependencies.identificationRepository);
        const sortField = req.query.sortField?.toString();
        const orderBy = req.query.orderBy?.toString();
        const result = await fetchIndetification.Execute(sortField, orderBy);

        if (result.error) {
            return res.status(400).json({ error: result.error.message });
        }

        return res.status(200).json({ identifications: result.succeed });
    }

    async update(req:Request, res:Response) {
        const updateIdentification:UpdateIdentification = new UpdateIdentification(this.dependencies.identificationRepository);

        const result = await updateIdentification.Execute(req.params.identificationId, req.body.status);

        if (result.error) {
            if (result.error.message === 'not authorized') {
                return res.status(401).json({ error: result.error.message });
            }

            if (result.error.message === 'not founded') {
                return res.status(404).json({ error: result.error.message });
            }

            return res.status(400).json({ error: result.error.message });
        }

        return res.status(200).json({ identification: result.succeed });
    }
}