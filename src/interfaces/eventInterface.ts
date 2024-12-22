import { AreaOfExpertiseDTO } from "./areaOfExpertiseInterface";
import { Checkin } from "./checkinInterface";
import { Speaker } from "./speakerInterface";

export type Evente = {
    title: string;
    date: string;
    time: string;
    location: string;
    about: string;
    speakers: {
      name: string;
      photoUrl?: string;
    }[];
  };
// trocar pra event
export interface Event {
    idActivity: number;
    title: string;
    description: string;
    time: string;
    date: string;
    location: string;
    checkins?: Checkin[];
    speaker?: Speaker[];
    areaOfExpertise: AreaOfExpertiseDTO[];
}

export interface CreateEvent {
  title: string;
  description: string;
  time: string;
  date: Date;
  location: string;
  speakerId?: number[];
  idArea: number[];
}