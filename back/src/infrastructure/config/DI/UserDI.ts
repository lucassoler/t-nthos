import UserDIFactory from "./factories/UserDIFactory"

export const UserDI = {
    userRepository: UserDIFactory.userRepository()
}