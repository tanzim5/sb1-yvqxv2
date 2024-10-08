export interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
  track?: string;
}

export interface Track {
  id: string;
  name: string;
  color: string;
}