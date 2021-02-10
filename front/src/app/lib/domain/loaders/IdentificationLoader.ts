import Identification from "../entities/Identification";

export default interface IdentificationLoader {
    all(sortField:string | null, orderBy: string):Promise<Identification[]>;
    update(id:string, status: string):Promise<Identification>;
};
