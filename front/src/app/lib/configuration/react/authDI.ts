import SignIn from "../../application/usecases/SignIn";
import { AuthDIFactory } from "./factories/AuthDIFactory";


export const AuthDI = {
    signInHandler: new SignIn(AuthDIFactory
        .authLoader()
    )
}
