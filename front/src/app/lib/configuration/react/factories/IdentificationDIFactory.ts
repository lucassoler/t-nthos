import InMemoryIdentificationLoader from "../../../adapters/secondaries/inmemory/InMemoryIdentificationLoader";
import RESTClient from "../../../adapters/secondaries/real/RESTClient";
import RESTIdentificationLoader from "../../../adapters/secondaries/real/RESTIdentificationLoader";
import IdentificationLoader from "../../../domain/loaders/IdentificationLoader";

export class IdentificationDIFactory {
    private static instance:IdentificationDIFactory;
    private loader:IdentificationLoader;

    constructor(http: RESTClient) {
        switch (process.env.REACT_APP_MODE) {
            case 'real':                
                switch (process.env.SOURCE) {
                    default:
                        this.loader = new RESTIdentificationLoader(http)
                        break;
                }
                break;
            default:
                this.loader = this.loadIdentificationInMemoryLoader()
        }
    }

    static identificationHandler(http: RESTClient): IdentificationLoader {
        if (!this.instance) {
            this.instance = new IdentificationDIFactory(http);
        }

        return this.instance.loader;
    }

    private loadIdentificationInMemoryLoader(): IdentificationLoader {
        return new InMemoryIdentificationLoader([]);
    }
}