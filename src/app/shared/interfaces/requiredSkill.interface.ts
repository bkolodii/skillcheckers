import { Question } from "./question.interface";

export interface RequiredSkills {
    creationDate: string,
    name: string,
    unitName: string,
    unitLocation: string,
    mainSkill: string,
    additionalSkill: string,
    progNeed: number,
    dueDate: string,
    salaryRange: string,
    yearExperience: number,
    skillScore: string,
    kindJob: string,
    workMode: string,
    termOfContract: string,
    question?: Array<Question>,
    jobDesc?: string,
    id?: string
}