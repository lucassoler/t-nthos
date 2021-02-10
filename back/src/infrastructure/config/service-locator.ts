import IdentificationRepository from "../../domain/repositories/IdentificationRepository";
import UserRepository from "../../domain/repositories/UserRepository";
import { Dependencies } from "./dependencies";
import { IdentificationDI } from "./DI/IdentificationDI";
import { UserDI } from "./DI/UserDI";

export default (() => {
    const userRepository:UserRepository = UserDI.userRepository;
    const identificationRepository:IdentificationRepository = IdentificationDI.identificationRepository;

    const beans:Dependencies = {
        userRepository: userRepository,
        identificationRepository: identificationRepository
    };
    
    return beans;
})();