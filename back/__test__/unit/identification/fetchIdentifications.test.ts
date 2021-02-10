import FetchIdentifications from "../../../src/application/usecases/FetchIdentifications";
import Identification from "../../../src/domain/entities/Identification";
import IdentificationRepository from "../../../src/domain/repositories/IdentificationRepository";
import InMemoryIdentificationRepository from "../../../src/infrastructure/repositories/inmemory/InMemoryIdentificationRepository";

const IDENTIFICATION_1 = { id: '1', source: 'ABC', createdAt: new Date(), status: 'WAITING' };
const IDENTIFICATION_2 = { id: '2', source: 'BCD', createdAt: new Date(), status: 'WAITING' };
describe('Fetch all identifications', () => {
    describe('Return an error', () => {
        test('if sortBy field is not valid', async () => {
            const fetchIndetification:FetchIdentifications = createHandler([]);
            const result = await fetchIndetification.Execute('invalid');
            expect(result.error).toStrictEqual(new Error('invalid sortBy field'));
        });
    });
    describe('Get all identifications', () => {
        test('in a source of 0 identifications', async () => {
            const fetchIdentifications: FetchIdentifications = createHandler([]);
            const result = await fetchIdentifications.Execute();
            expect(result.succeed).toStrictEqual([]);
        });
        test('in a source of 1 identifications', async () => {
            const fetchIdentifications: FetchIdentifications = createHandler([IDENTIFICATION_1]);
            const result = await fetchIdentifications.Execute();
            expect(result.succeed).toStrictEqual([IDENTIFICATION_1]);
        });
        test('in a source of 2 identifications', async () => {
            const fetchIdentifications: FetchIdentifications = createHandler([IDENTIFICATION_1, IDENTIFICATION_2]);
            const result = await fetchIdentifications.Execute();
            expect(result.succeed).toStrictEqual([IDENTIFICATION_1, IDENTIFICATION_2]);
        });
        test('in a source of 2 identifications sorted by source DESC', async () => {
            const fetchIdentifications: FetchIdentifications = createHandler([IDENTIFICATION_1, IDENTIFICATION_2]);
            const result = await fetchIdentifications.Execute('source', 'DESC');
            expect(result.succeed).toStrictEqual([IDENTIFICATION_2, IDENTIFICATION_1]);
        });
    });
});

function createHandler(identificationPopulation: Identification[]) {
    const identificationRepository: IdentificationRepository = new InMemoryIdentificationRepository(identificationPopulation);
    const fetchIdentifications: FetchIdentifications = new FetchIdentifications(identificationRepository);
    return fetchIdentifications;
}
