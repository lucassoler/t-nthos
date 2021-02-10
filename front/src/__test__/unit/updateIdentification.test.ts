import InMemoryIdentificationLoader from "../../app/lib/adapters/secondaries/inmemory/InMemoryIdentificationLoader";
import UpdateIdentification from "../../app/lib/application/usecases/UpdateIdentification";
import Identification from "../../app/lib/domain/entities/Identification";
import IdentificationLoader from "../../app/lib/domain/loaders/IdentificationLoader";

describe('Update Identification Status', () => {
    describe('Update identification successfully', () => {
        test('update from WAITING to REJECTED', async () => {
            const updateIdentification:UpdateIdentification = createHandler();
            const result = await updateIdentification.Execute('1', 'REJECTED');
        });
    });
});

function createHandler(identificationSource:Identification[] = []): UpdateIdentification {
    const identificationLoader:IdentificationLoader = new InMemoryIdentificationLoader(identificationSource);
    return new UpdateIdentification(identificationLoader);
}