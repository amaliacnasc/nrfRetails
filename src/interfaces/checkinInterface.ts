import { Participant } from "./participantInterface";

export interface Checkin{
    idCheckin: number;
    participant: Participant | null
    idActivity: number 
    checkinDateTime: Date;
}
export interface CreateCheckin {
    idParticipant: number;
    idActivity: number;
}