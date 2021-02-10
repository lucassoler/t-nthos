import Identification from "../../../domain/entities/Identification";
import IdentificationLoader from "../../../domain/loaders/IdentificationLoader";
import RESTClient from "./RESTClient";

export default class RESTIdentificationLoader implements IdentificationLoader {
    constructor(private http:RESTClient) {

    }

    async all(sortField:string | null, orderBy: string):Promise<Identification[]> {
        const token:string | null = localStorage.getItem('token');
        const result: { identifications:Identification[] } = await this.http
            .get<{ identifications:Identification[] }>(process.env.REACT_APP_REST_ENDPOINT + '/identification?sortField=' + sortField + '&orderBy=' + orderBy, token).toPromise();

        
        return Promise.resolve(result.identifications);
    }

    async update(id:string, status:string):Promise<Identification> {
        const token:string | null = localStorage.getItem('token');
        const result: { identification:Identification } = await this.http
            .put<{ identification:Identification }>(process.env.REACT_APP_REST_ENDPOINT + '/identification/' + id, token, { status: status }).toPromise();

        
        return Promise.resolve(result.identification);
    }
};
