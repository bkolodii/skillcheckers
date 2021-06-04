import { completedDayEvents } from "../interfaces/completedDayEvents.interface";

export class completedDayEventsClass implements completedDayEvents {
    constructor(
       public id: string,
       public icon: string,
       public name: string,
       public prof_skill: string,
       public data: string,
       public time: string,
       public interviewers: Array<string>,
       public order: string,
       public skillscore: string,
       public ourscore: string
    ){}
}