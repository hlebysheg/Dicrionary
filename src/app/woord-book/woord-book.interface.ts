import { Iletter } from "../letter/letter.interfare"

export interface IWoordBook{
    title: string,
    language: string,
    author: string,
    id?: number
    letter?: Array<Iletter>| null
}