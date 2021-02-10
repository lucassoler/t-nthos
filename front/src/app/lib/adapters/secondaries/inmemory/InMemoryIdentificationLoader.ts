import Identification from "../../../domain/entities/Identification";
import IdentificationLoader from "../../../domain/loaders/IdentificationLoader";

export default class InMemoryIdentificationLoader implements IdentificationLoader {
    constructor(private identifications:Identification[]) {

    }

    all(sortField:string | null, orderBy: string):Promise<Identification[]> {
        const identifications = this.identifications;

        identifications.sort((a, b) => {
            if (!sortField) sortField = 'id';

            if (orderBy === 'DESC')
                return a[sortField] >= b[sortField] ? -1 : 1;

            return a[sortField] >= b[sortField] ? 1 : -1;
        });

        return Promise.resolve(this.identifications);
    }

    update(id:string, status:string):Promise<Identification> {
        const identification = this.identifications.find(i => i.id === id);
        if (!identification) throw new Error("not founded");

        identification.status = status;
        
        return Promise.resolve(identification);
    }
};
