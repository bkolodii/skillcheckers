import { Message } from "./messages.interface";

export interface mesUser{
    id?: string,
    img: string,
    name: string,
    time:  string,
    missing: number,
    text: string,
    url: string,
    messages?: Array<Message>
}