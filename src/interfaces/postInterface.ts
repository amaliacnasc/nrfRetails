import { Like } from "./likesinteraface";
import { Participant } from "./participantInterface";

export interface Post {
    idPost: number;
    participant: Participant;
    imageUrl: string;
    description: string;
    likes?: Like[];
}  

export interface CreatePost {
    idParticipant: number;
    imageUrl: string;
    description: string;
}