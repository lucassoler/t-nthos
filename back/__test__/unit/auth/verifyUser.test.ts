import VerifyUser from "../../../src/application/usecases/VerifyUser";
import User from "../../../src/domain/entities/User";
import UserRepository from "../../../src/domain/repositories/UserRepository";
import InMemoryUserRepository from "../../../src/infrastructure/repositories/inmemory/InMemoryUserRepository";

describe('Verify User Token', () => {
    describe('Return an error', () => {
        test('if token is not valid', async () => {
            const verifyUser: VerifyUser = createHandler([]);
            const result = await verifyUser.Execute('invalid');
            verifyError(result.error, 'invalid token');
        });
        test('if token is not valid in a source of 1 user without token', async () => {
            const verifyUser: VerifyUser = createHandler([{ email: 'jane@gmail.com', password: 'password', token: null }]);
            const result = await verifyUser.Execute('invalid');
            verifyError(result.error, 'invalid token');
        });
        test('if token is not valid in a source of 1 user with token', async () => {
            const verifyUser: VerifyUser = createHandler([{ email: 'jane@gmail.com', password: 'password', token: 'TOKEN' }]);
            const result = await verifyUser.Execute('invalid');
            verifyError(result.error, 'invalid token');
        });
    });

    describe('User is verified', () => {
        test('if token is not valid in a source of 1 user with token', async () => {
            const verifyUser: VerifyUser = createHandler([{ email: 'jane@gmail.com', password: 'password', token: 'TOKEN' }]);
            const result = await verifyUser.Execute('TOKEN');
            expect(result.error).toBeNull();
        });
    });
});

function createHandler(userPopulation:User[]) {
    const userRepository: UserRepository = new InMemoryUserRepository(userPopulation);
    const verifyUser: VerifyUser = new VerifyUser(userRepository);
    return verifyUser;
}

function verifyError(error: Error | null, errorMessage: string) {
    expect(error).toStrictEqual(new Error(errorMessage));
}
