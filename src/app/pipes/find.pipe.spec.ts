import { Iletter } from "../letter/letter.interfare";
import { IWoordBook } from "../woord-book/woord-book.interface";
import { SearchLetterPipe } from "./find.pipe"

describe('FindPipe', () => {
    let pipe: SearchLetterPipe
    
    beforeEach(()=>{
        pipe = new SearchLetterPipe();
    })

    it('should create instanse', () => {
        expect(pipe).toBeTruthy()
        expect(pipe.transform).toBeDefined()
    })

    it('should return correct on letter', () => {
        let letter: Array<Iletter> = [{
            word: 'apple',
            translate: 'яблоко',
            anotation: 'engl',
            id: 1,
            dictId: 1,
        },
        {
            word: 'hi',
            translate: 'привет',
            anotation: 'engl',
            id: 1,
            dictId: 1,
        }]

        expect(pipe.transform(letter, 'hi')).toEqual([letter[1]])
        expect(pipe.transform(letter, 'apple')).toEqual([letter[0]])
    })

    it('should return correct on woordbooks', () => {
        let letter: Array<IWoordBook> = [{
            title: 'en',
            language: 'en',
            author: 'en',
            id: 1,
            letter: null
        },
        {
            title: 'fr',
            language: 'fr',
            author: 'fr',
            id: 1,
            letter: null
        }]

        expect(pipe.transform(letter, 'fr')).toEqual([letter[1]])
        expect(pipe.transform(letter, 'en')).toEqual([letter[0]])
    })
})