import Usecase from "../../common/Usecase";
import Identification from "../../domain/entities/Identification";
import IdentificationLoader from "../../domain/loaders/IdentificationLoader";

export default class FetchIdentification extends Usecase {
    constructor(private identificationLoader:IdentificationLoader) {
        super();
    }

    async Execute(sortField:string | null = null, orderBy:string = 'ASC') {
        try {
            const identifications:Identification[] = await this.identificationLoader.all(sortField, orderBy);
            return this.succeed(identifications);
        } catch (error) {
            return this.failure(error);
        }
    }
};
