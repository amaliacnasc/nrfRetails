import { AreaOfExpertiseDTO } from "./areaOfExpertiseInterface";
import { Checkin } from "./checkinInterface";
import { Speaker } from "./speakerInterface";

export type Event = {
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
export interface Evente {
    idActivity: number;
    title: string;
    description: string;
    time: string;
    date: Date;
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