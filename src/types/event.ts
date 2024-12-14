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
