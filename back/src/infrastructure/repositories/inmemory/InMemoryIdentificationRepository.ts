import Identification from "../../../domain/entities/Identification";
import IdentificationRepository from "../../../domain/repositories/IdentificationRepository";
import IdentificationController from "../../../interface/webserver/controllers/IdentificationController";

export default class InMemoryIdentificationRepository implements IdentificationRepository {
    constructor(private identifications:Identification[]) {

    }

    fetch(sortedBy:string | null, sortedOrder:string):Promise<Identification[]> {
        this.identifications.sort((a, b) => {
            if (!sortedBy) sortedBy = 'id';

            if (sortedOrder === 'DESC')
                return a[sortedBy] >= b[sortedBy] ? -1 : 1;

            return a[sortedBy] >= b[sortedBy] ? 1 : -1;
        });

        return Promise.resolve(this.identifications);
    }

    get(id:string):Promise<Identification> {
        const identification:Identification | undefined = this.identifications.find(i => i.id === id);
        if (!identification) throw new Error("identification not founded");
        return Promise.resolve(identification);
    }

    save(identification:Identification):Promise<void> {
        return Promise.resolve();
    }
}