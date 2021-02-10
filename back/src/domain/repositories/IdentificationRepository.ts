import Identification from "../entities/Identification";

export default interface IdentificationRepository {
    fetch(sortedBy:string | null, sortedOrder:string):Promise<Identification[]>;
    get(id:string):Promise<Identification>;
    save(identification:Identification):Promise<void>;
};
