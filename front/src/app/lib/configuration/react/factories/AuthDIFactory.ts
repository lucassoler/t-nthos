import InMemoryAuthLoader from "../../../adapters/secondaries/inmemory/InMemoryAuthLoader";
import AuthLoader from "../../../domain/loaders/AuthLoader";

export class AuthDIFactory {
    private static instance:AuthDIFactory;
    private loader:AuthLoader;

    constructor() {
        switch (process.env.REACT_APP_MODE) {
            // case 'real':                
            //     switch (process.env.SOURCE) {
            //         default:
            //             this.loader = new RESTUserLoader(http)
            //             break;
            //     }
            //     break;
            default:
                this.loader = this.loadAuthInMemoryLoader()
        }
    }

    static authLoader(): AuthLoader {
        if (!this.instance) {
            this.instance = new AuthDIFactory();
        }

        return this.instance.loader;
    }

    private loadAuthInMemoryLoader(): AuthLoader {
        return new InMemoryAuthLoader();
    }
}