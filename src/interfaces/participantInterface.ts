import { AreaOfExpertiseDTO } from "./areaOfExpertiseInterface";

export interface CreateParticipant {
    idParticipant: number;
    name: string;
    email: string;
    companyName?: string;
    idArea: number[];
    postPermission?: number;
}


export interface Participant {
    idParticipant: number;
    name: string;
    email: string;
    companyName?: string;
    AreaOfExpertise: AreaOfExpertiseDTO[];
    postPermission?: number;
}