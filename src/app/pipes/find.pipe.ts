import { Pipe, PipeTransform } from '@angular/core';
import { IWoordBook } from '../woord-book/woord-book.interface';
import { Iletter } from '../letter/letter.interfare';

@Pipe({
    name: 'SearchLetterPipe'
})
export class SearchLetterPipe implements PipeTransform {
    transform(value: Array<Iletter> | null | Array<IWoordBook> | undefined, args?: string): any {

        if(!value || value === null || value === undefined)return null;
        if(!args || args === undefined)return value;
        if(value.length === 0) return value
        
        let letter = value as Array<Iletter>
        let dicts = value as Array<IWoordBook>
        // args = args.toLowerCase();
        
        if(letter![0].word != undefined){
            return letter!.filter((el) => {
                if(el != undefined && el.word != undefined){
    
                    let inWord = el.word.toLowerCase().includes(String(args).toLowerCase())
                    let inTranslate = el.translate.toLowerCase().includes(String(args).toLowerCase())
                    let inAnotation = el.anotation.toLowerCase().includes(String(args).toLowerCase())
    
                    return inWord || inTranslate || inAnotation
                }
                return true
            });
        }

        if(dicts![0].author != undefined){
            return dicts!.filter((el)=> {
                if(el != undefined && el.title != undefined){
                    let inLanguage = el.language.toLowerCase().includes(String(args).toLowerCase())
                    let inTitle = el.title.toLowerCase().includes(String(args).toLowerCase())
                    return inLanguage || inTitle
                }
                return true
            })
        }      
    }
}