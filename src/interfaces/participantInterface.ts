import { AreaOfExpertiseDTO } from "./areaOfExpertiseInterface";

export interface CreateParticipant {
    name: string;
    email: string;
    position: string;
    contact: string;
    companyName?: string;
    idArea: number[];
    postPermission?: number;
}


export interface Participant {
    idParticipant: number;
    name: string;
    email: string;
    position: string;
    contact: string;
    companyName?: string;
    AreaOfExpertise: AreaOfExpertiseDTO[];
    postPermission?: number;
}