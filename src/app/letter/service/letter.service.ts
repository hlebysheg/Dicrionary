import { Iletter } from '../letter.interfare';
import { BehaviorSubject, Subscription, delay } from "rxjs"
import { Injectable } from '@angular/core';
import { LetterHttpService } from './letterHttp.service';
import { __values } from 'tslib';

@Injectable({ providedIn: 'root' })
export class LetterService {

    private _letters =  new BehaviorSubject<Array<Iletter>|null>(null)
    public readonly letters$ = this._letters.asObservable() 
    
    private _dictId =  new BehaviorSubject<number | null>(null)
    public readonly dictId$ = this._letters.asObservable() 

    constructor (private letterHttp: LetterHttpService){}

    setLetter(id: number){
        let sub: Subscription | null = null

        this._dictId.next(id)

        sub = this.letterHttp.getMyLetter(id).subscribe(el => this._letters.next(el))

        if (sub.closed){
            sub.unsubscribe()
            sub = null
        }
    }

    createLetter(word: string, translate: string, anotation: string){
        let sub: Subscription | null = null

        if(this._dictId.value != null){
            let letter: Iletter = {
                word: word,
                translate: translate,
                anotation: anotation,
                id: 0,
                dictId: this._dictId.value
            }
            sub = this.letterHttp.postMyLetter(letter).subscribe((el: Iletter) => {
                if(el != undefined && this._letters.value != null){
                    this._letters.next(this._letters.value?.concat([el]))
                }
            })
        }
    }

    deleteLetter(id: number){
        let sub: Subscription | null = null

        sub = this.letterHttp.delMyLetter(id).subscribe((el) => {
            if(this._letters.value != null){
                this._letters.next(this._letters.value?.filter(e=> e.id != id))
            }
        })
    }

    updateLetter(word: string, translate: string, anotation: string, id: number){
        let sub: Subscription | null = null

        if(this._dictId.value != null){
            let letter: Iletter = {
                word: word,
                translate: translate,
                anotation: anotation,
                id: id,
                dictId: this._dictId.value
            }

            sub = this.letterHttp.putMyLetter(letter).subscribe((el) => {
                if(el != undefined && this._letters.value != null){
                    this._letters.next(this._letters.value.map(e => {
                        if(e.id === id){
                            e = el
                        }
                        return e
                    }))
                }
            })
        }
    }
    
}