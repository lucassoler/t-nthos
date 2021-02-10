
import Identification from "../../../../domain/entities/Identification";

const ID_1:Identification = {
    id: '1',
    source: 'ENTREPRISE 1',
    createdAt: new Date('11-09-2020'),
    status: 'WAITING'
};
const ID_2:Identification = {
    id: '2',
    source: 'ENTREPRISE 2',
    createdAt: new Date('11-11-2020'),
    status: 'WAITING'
};
const ID_3:Identification = {
    id: '3',
    source: 'ENTREPRISE 3',
    createdAt: new Date('11-10-2020'),
    status: 'WAITING'
};

export { ID_1, ID_2, ID_3 };