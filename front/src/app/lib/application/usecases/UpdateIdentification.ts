import Usecase from "../../common/Usecase";
import Identification from "../../domain/entities/Identification";
import IdentificationLoader from "../../domain/loaders/IdentificationLoader";

export default class FetchIdentification extends Usecase {
    constructor(private identificationLoader:IdentificationLoader) {
        super();
    }

    async Execute(id:string, status:string) {
        try {
            const identification:Identification = await this.identificationLoader.update(id, status);
            return this.succeed(identification);
        } catch (error) {
            return this.failure(error);
        }
    }
};
