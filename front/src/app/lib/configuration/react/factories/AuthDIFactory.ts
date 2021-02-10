import InMemoryAuthLoader from "../../../adapters/secondaries/inmemory/InMemoryAuthLoader";
import RESTAuthLoader from "../../../adapters/secondaries/real/RESTAuthLoader";
import RESTClient from "../../../adapters/secondaries/real/RESTClient";
import AuthLoader from "../../../domain/loaders/AuthLoader";

export class AuthDIFactory {
    private static instance:AuthDIFactory;
    private loader:AuthLoader;

    constructor(http: RESTClient) {
        switch (process.env.REACT_APP_MODE) {
            case 'real':                
                switch (process.env.SOURCE) {
                    default:
                        this.loader = new RESTAuthLoader(http)
                        break;
                }
                break;
            default:
                this.loader = this.loadAuthInMemoryLoader()
        }
    }

    static authLoader(http: RESTClient): AuthLoader {
        if (!this.instance) {
            this.instance = new AuthDIFactory(http);
        }

        return this.instance.loader;
    }

    private loadAuthInMemoryLoader(): AuthLoader {
        return new InMemoryAuthLoader();
    }
}