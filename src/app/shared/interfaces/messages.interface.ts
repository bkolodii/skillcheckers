import { Files } from "../interfaces/file.interface";

export interface Message {
    user: string,
    userIcon: string,
    text: string,
    date: string,
    time: string,
    file: Files | string,
    dateForCheck: string
}