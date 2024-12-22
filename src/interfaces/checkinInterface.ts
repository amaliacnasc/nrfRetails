import { Participant } from "./participantInterface";

export interface Checkin{
    idCheckin: number;
    participant: Participant | null
    idActivity: number 
    checkinDateTime: Date;
}
export interface CreateCheckinDTO {
    idParticipant: number;
    idActivity: number;
}