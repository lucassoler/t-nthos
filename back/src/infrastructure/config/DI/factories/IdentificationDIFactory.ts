import IdentificationRepository from "../../../../domain/repositories/IdentificationRepository";
import InMemoryIdentificationRepository from "../../../repositories/inmemory/InMemoryIdentificationRepository";
import { ID_1, ID_2, ID_3 } from "../examples/IdentificationExemples";


export default class IdentificationDIFactory {
    private static instance:IdentificationDIFactory;
    private repository:IdentificationRepository;

    constructor() {
        switch (process.env.MODE) {
            default:
                this.repository = this.loadContentInMemoryLoader()
        }
    }
    static identificationRepository(): IdentificationRepository {
        if (!this.instance) {
            this.instance = new IdentificationDIFactory();
        }

        return this.instance.repository;
    }

    private loadContentInMemoryLoader(): IdentificationRepository {
        return new InMemoryIdentificationRepository([ID_1, ID_2, ID_3]);
    }
}