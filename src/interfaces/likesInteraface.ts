import { Participant } from "./participantInterface";

export interface CountLike {
    idPost: number;
    LikeCount: number
}

export interface CreateLike {
    idParticipant: number;
    idPost: number;
}

export interface Like {
    idLike: number;
    participant: Participant | null;
    idPost: number
}