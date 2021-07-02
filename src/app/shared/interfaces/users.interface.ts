import { mesUser } from "./mesUser.interface";

export interface Users {
    id?: string,
    email: string,
    icon: string,
    password: string
    username: string,
    usersMess : Array<mesUser>
}