import { ObservableRESTClient } from "../../adapters/secondaries/real/ObservableRESTClient";
import FetchIdentification from "../../application/usecases/FetchIdentification";
import UpdateIdentification from "../../application/usecases/UpdateIdentification";
import { IdentificationDIFactory } from "./factories/IdentificationDIFactory";

export const IdentificationDI = {
    identificationHandler: new FetchIdentification(IdentificationDIFactory
        .identificationHandler(new ObservableRESTClient())
    ),
    updateIdentificationHandler: new UpdateIdentification(IdentificationDIFactory
        .identificationHandler(new ObservableRESTClient())
    )
}
