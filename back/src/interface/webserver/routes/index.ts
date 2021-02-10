import express from 'express';
import { Dependencies } from '../../../infrastructure/config/dependencies';
import auth from './auth';
import identification from './identification';

export default ((dependencies:Dependencies) => {
    const routes = express.Router();

    routes.use('/auth', auth(dependencies));
    routes.use('/identification', identification(dependencies));

    return routes;
});