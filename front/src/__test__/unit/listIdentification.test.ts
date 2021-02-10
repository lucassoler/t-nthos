import InMemoryIdentificationLoader from "../../app/lib/adapters/secondaries/inmemory/InMemoryIdentificationLoader";
import FetchIdentification from "../../app/lib/application/usecases/FetchIdentification";
import Identification from "../../app/lib/domain/entities/Identification";
import IdentificationLoader from "../../app/lib/domain/loaders/IdentificationLoader";

const IDENTIFICATION_1 = { id: '1', source: 'ENTREPRISE 1', createdAt: new Date(), status: 'WAITING' };
const IDENTIFICATION_2 = { id: '2', source: 'ENTREPRISE 2', createdAt: new Date(), status: 'WAITING' };
describe('Fetch list of identification', () => {
    describe('Return a list of identification', () => {
        test('from a source of 0 identification', async () => {
            const fetchIndetification:FetchIdentification = createHandler();
            const result = await fetchIndetification.Execute();
            expect(result.succeed).toStrictEqual([]);
        });

        test('from a source of 1 identification', async () => {
            const fetchIndetification:FetchIdentification = createHandler([IDENTIFICATION_1]);
            const result = await fetchIndetification.Execute();
            expect(result.succeed).toStrictEqual([IDENTIFICATION_1]);
        });

        test('from a source of 2 identifications', async () => {
            const fetchIndetification:FetchIdentification = createHandler([IDENTIFICATION_1, IDENTIFICATION_2]);
            const result = await fetchIndetification.Execute();
            expect(result.succeed).toStrictEqual([IDENTIFICATION_1, IDENTIFICATION_2]);
        });

        test('from a source of 2 identifications sorted by source ASC', async () => {
            const fetchIndetification:FetchIdentification = createHandler([IDENTIFICATION_1, IDENTIFICATION_2]);
            const result = await fetchIndetification.Execute('source', 'ASC');
            expect(result.succeed).toStrictEqual([IDENTIFICATION_1, IDENTIFICATION_2]);
        });

        test('from a source of 2 identifications sorted by source DESC', async () => {
            const fetchIndetification:FetchIdentification = createHandler([IDENTIFICATION_1, IDENTIFICATION_2]);
            const result = await fetchIndetification.Execute('source', 'DESC');
            expect(result.succeed).toStrictEqual([IDENTIFICATION_2, IDENTIFICATION_1]);
        });
    });
});

function createHandler(identificationSource:Identification[] = []): FetchIdentification {
    const identificationLoader:IdentificationLoader = new InMemoryIdentificationLoader(identificationSource);
    return new FetchIdentification(identificationLoader);
}
