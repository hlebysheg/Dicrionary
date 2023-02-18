import { Iletter } from "../letter/letter.interfare"

export interface IresponseTest{
    id: number
    letterResponses: Array<Iletter>       
    date: Date
}


export interface IrequestTest{
    id: number
    letterAnswer: Array<Iletter>
    finalTime: Date
}

export interface result {
    test: {
        id: number
        creationTime: Date
        finalTime: Date
        score: Score
        testToLetters: null
    }
    answer: {
        id: number
        word: string
        translate: string
        correct: boolean
    }
}

enum Score{
    E,
    D,
    C,
    B,
    A,
    S
}

//test
export interface ITest {
    id: number
    creationTime: Date
    finalTime: Date
    score: Score
    testToLetters: null
    answer: Array<IAnswer>
}

export interface IAnswer{
    id: number
    word: number
    translate: number
    correct: boolean | null
}

export interface ITestResult extends ITest{
    
}