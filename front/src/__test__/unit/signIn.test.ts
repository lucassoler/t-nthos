import InMemoryAuthLoader from "../../app/lib/adapters/secondaries/inmemory/InMemoryAuthLoader";
import SignIn from "../../app/lib/application/usecases/SignIn";
import AuthLoader from "../../app/lib/domain/loaders/AuthLoader";

describe('Sign In', () => {
    describe('Return an error', () => {
        test('if email is empty', async () => {
            const signIn:SignIn = createHandler();
            const result = await signIn.Execute('', '');
            verifyError(result.error, 'email is required');
        });
        test('if password is empty', async () => {
            const signIn:SignIn = createHandler();
            const result = await signIn.Execute('jane@gmail.com', '');
            verifyError(result.error, 'password is required');
        });
        test('if email or password is invalid', async () => {
            const signIn:SignIn = createHandler();
            const result = await signIn.Execute('jane@gmail.com', 'invalid');
            verifyError(result.error, 'invalid email or password');
        });
    });

    describe('Sign In successfully', () => {
        test('with valid email and password', async () => {
            const signIn:SignIn = createHandler();
            const result = await signIn.Execute('jane@gmail.com', 'azerty');
            verifyToken(result.succeed);
        });
    });
});

function verifyToken(token: string) {
    expect(token).not.toBeUndefined();
    expect(token).toBe('ToKEN');
    var storedToken = localStorage.getItem('token');
    expect(storedToken).toBe('ToKEN');
}

function createHandler(): SignIn {
    const authLoader:AuthLoader = new InMemoryAuthLoader();
    return new SignIn(authLoader);
}

function verifyError(error: Error | null, errorMessage: string) {
    expect(error).toStrictEqual(new Error(errorMessage));
}
