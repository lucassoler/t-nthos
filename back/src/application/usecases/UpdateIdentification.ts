import Usecase from "../../common/Usecase";
import constants from "../../domain/config/constants";
import Identification from "../../domain/entities/Identification";
import IdentificationRepository from "../../domain/repositories/IdentificationRepository";

export default class UpdateIdentification extends Usecase {
    constructor(private identificationRepository:IdentificationRepository) {
        super();
    }

    async Execute(id:string, status:string) {
        try {
            const identification:Identification = await this.identificationRepository.get(id);

            if (constants.IDENTIFICATION.AUTHORIZED_STATUS.indexOf(status) === -1) {
                throw new Error("invalid status");
            }

            if (identification.status !== 'WAITING') {
                throw new Error("not authorized");
            }

            identification.status = status;

            await this.identificationRepository.save(identification);

            return this.succeed(identification);
        } catch (error) {
            return this.failure(error);
        }
    }
}