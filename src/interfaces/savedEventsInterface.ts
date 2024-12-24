import { Event } from "./eventInterface";
import { Participant } from "./participantInterface";

export interface SaveActivity{
    idSaveActivity: number;
    idParticipant: number;
    activity: Event;
}

export interface CreateSaveActivity {
    idParticipant: number;
    idActivity: number;
  }