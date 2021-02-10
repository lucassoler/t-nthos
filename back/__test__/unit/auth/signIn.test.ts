import SignIn from "../../../src/application/usecases/SignIn";
import User from "../../../src/domain/entities/User";
import UserRepository from "../../../src/domain/repositories/UserRepository";
import InMemoryUserRepository from "../../../src/infrastructure/repositories/inmemory/InMemoryUserRepository";

describe('Sign In', () => {
    describe('Return an error', () => {
        test('if email is empty', async () => {
            const signIn: SignIn = createHandler();
            const result = await signIn.Execute('', '');
            verifyError(result.error, 'email is required');
        });
        
        test('if password is empty', async () => {
            const signIn: SignIn = createHandler();
            const result = await signIn.Execute('jane@gmail.com', '');
            verifyError(result.error, 'password is required');
        });
        test('if email or password is invalid', async () => {
            const signIn: SignIn = createHandler();
            const result = await signIn.Execute('jane@gmail.com', 'invalid');
            verifyError(result.error, 'invalid email or password');
        });
    });

    describe('Sign In successfully', () => {
        test('with valid email or password', async () => {
            const signIn: SignIn = createHandler([{ email: 'jane@gmail.com', password: 'azerty', token: null } ]);
            const result = await signIn.Execute('jane@gmail.com', 'azerty');
            expect(result.error).toBeNull();
            expect(result.succeed).toBe('TOKEN');
        });
    });
});

function createHandler(userPopulation:User[] = []) {
    const userRepository: UserRepository = new InMemoryUserRepository(userPopulation);
    const signIn: SignIn = new SignIn(userRepository);
    return signIn;
}

function verifyError(error: Error | null, errorMessage: string) {
    expect(error).toStrictEqual(new Error(errorMessage));
}
