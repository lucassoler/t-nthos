import IdentificationRepository from "../../domain/repositories/IdentificationRepository";
import UserRepository from "../../domain/repositories/UserRepository";

export type Dependencies = {
    userRepository: UserRepository,
    identificationRepository: IdentificationRepository,
}