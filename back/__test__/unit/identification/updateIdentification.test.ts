import UpdateIdentification from "../../../src/application/usecases/UpdateIdentification";
import Identification from "../../../src/domain/entities/Identification";
import IdentificationRepository from "../../../src/domain/repositories/IdentificationRepository";
import InMemoryIdentificationRepository from "../../../src/infrastructure/repositories/inmemory/InMemoryIdentificationRepository";

const IDENTIFICATION_1 = { id: '1', source: 'ABC', createdAt: new Date(), status: 'WAITING' };
const IDENTIFICATION_2 = { id: '2', source: 'ABC', createdAt: new Date(), status: 'REJECTED' };
const IDENTIFICATION_3 = { id: '3', source: 'ABC', createdAt: new Date(), status: 'WAITING' };
describe('Update Identification', () => {
    describe('Return an error', () => {
        test('if identification doesnt exist', async () => {
            const updateIdentification:UpdateIdentification = createHandler([]);
            const result = await updateIdentification.Execute('1', 'REJECTED');
            expect(result.error).toStrictEqual(new Error("identification not founded"));
        });
        test('if identification id not good', async () => {
            const updateIdentification:UpdateIdentification = createHandler([IDENTIFICATION_1]);
            const result = await updateIdentification.Execute('123', 'REJECTED');
            expect(result.error).toStrictEqual(new Error("identification not founded"));
        });
        test('if status is invalid', async () => {
            const updateIdentification:UpdateIdentification = createHandler([IDENTIFICATION_1]);
            const result = await updateIdentification.Execute('1', 'INVALID');
            expect(result.error).toStrictEqual(new Error("invalid status"));
        });
        test('if status is not waiting', async () => {
            const updateIdentification:UpdateIdentification = createHandler([IDENTIFICATION_1, IDENTIFICATION_2]);
            const result = await updateIdentification.Execute('2', 'REJECTED');
            expect(result.error).toStrictEqual(new Error("not authorized"));
        });
    });

    describe('Update Successfully', () => {
        test('from WAITING to REJECTED', async () => {
            const updateIdentification:UpdateIdentification = createHandler([IDENTIFICATION_1, IDENTIFICATION_2]);
            const result = await updateIdentification.Execute('1', 'REJECTED');
            expect(result.error).toBeNull();
            expect(result.succeed.status).toBe('REJECTED');
        });

        test('from WAITING to ACCEPTED', async () => {
            const updateIdentification:UpdateIdentification = createHandler([IDENTIFICATION_1, IDENTIFICATION_2, IDENTIFICATION_3]);
            const result = await updateIdentification.Execute('3', 'ACCEPTED');
            expect(result.error).toBeNull();
            expect(result.succeed.status).toBe('ACCEPTED');
        });
    });
});

function createHandler(identificationPopulation: Identification[]) {
    const identificationRepository: IdentificationRepository = new InMemoryIdentificationRepository(identificationPopulation);
    const updateIdentification: UpdateIdentification = new UpdateIdentification(identificationRepository);
    return updateIdentification;
}