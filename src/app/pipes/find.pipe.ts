import { Pipe, PipeTransform } from '@angular/core';
import { IWoordBook } from '../woord-book/woord-book.interface';
import { Iletter } from '../letter/letter.interfare';

@Pipe({
    name: 'SearchLetterPipe'
})
export class SearchLetterPipe implements PipeTransform {
    transform(value: Array<Iletter> | null | Array<IWoordBook>, args?: string): any {

        if(!value || value === null)return null;
        if(!args || args === undefined)return value;

        let letter = value as Array<Iletter>
        let dicts = value as Array<IWoordBook>
        // args = args.toLowerCase();
        
        if(letter[0].word){
            return letter.filter((el) => {
                if(el != undefined && el.word != undefined){
    
                    let inWord = el.word.toLowerCase().includes(String(args).toLowerCase())
                    let inTranslate = el.translate.toLowerCase().includes(String(args).toLowerCase())
                    let inAnotation = el.anotation.toLowerCase().includes(String(args).toLowerCase())
    
                    return inWord || inTranslate || inAnotation
                }
                return true
            });
        }

        if(dicts[0].author){
            return dicts.filter((el)=> {
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