// Temporary types for development
export interface Base {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export enum PlaceType {
  Room = 0,
  Hall = 1,
  Cafe = 2,
  Restaurant = 3,
}

export enum DeviceType {
  Network = 0,
  Projector = 1,
  LED = 2,
  Microphone = 3,
}

export interface Place extends Base {
  type: PlaceType;
  name: string;
  address?: string;
  size: number;
  devices: DeviceType[];
  openWeekDays: number[];
  openTime: string;
  closeTime: string;
  organization?: any;
}

export interface Forum extends Base {
  title: string;
  summary?: string;
  startTime: string;
  endTime: string;
  place?: Place;
}