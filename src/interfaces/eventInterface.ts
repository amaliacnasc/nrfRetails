import { AreaOfExpertiseDTO } from "./areaOfExpertiseInterface";
import { Checkin } from "./checkinInterface";
import { Speaker } from "./speakerInterface";


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
