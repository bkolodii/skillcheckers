import { allEvents } from "./allEvents.interface";

export interface Events {
    monthNumber: number,
    dayNumber: number,
    countEvent: Array<allEvents>,
    yearNumber: number
}