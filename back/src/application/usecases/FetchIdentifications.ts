import Usecase from "../../common/Usecase";
import constants from "../../domain/config/constants";
import Identification from "../../domain/entities/Identification";
import IdentificationRepository from "../../domain/repositories/IdentificationRepository";

export default class FetchIdentifications extends Usecase {
    constructor(private identificationRepository:IdentificationRepository) {
        super();
    }

    async Execute(sortedBy:string | null = null, sortedOrder:string = 'ASC') {
        try {
            if (sortedBy && constants.IDENTIFICATION.AUTHORIZED_SORT_BY.indexOf(sortedBy) === -1) {
                throw new Error("invalid sortBy field");
                
            }
            
            const identifications:Identification[] = await this.identificationRepository.fetch(sortedBy, sortedOrder);

            return this.succeed(identifications);
        } catch (error) {
            return this.failure(error);
        }
    }
}