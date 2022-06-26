import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { Iletter } from "../../letter/letter.interfare";
import { IWoordBook } from "../woord-book.interface";
import { woordBookHttpService } from "./woordBookHttp.service";

@Injectable({ providedIn: 'root' })
export class woordBookService {

    private _woordBook =  new BehaviorSubject<Array<IWoordBook>|null>(null)
    public readonly woordBook$ = this._woordBook.asObservable() 

    constructor (private wordbookHttp: woordBookHttpService){}

    setWoordBook(){
        
        let sub: Subscription | null = this.wordbookHttp.getMyWoordBook()
            .subscribe(el => {
                this._woordBook.next(el)   
            })

        if (sub.closed){
            sub.unsubscribe()
            sub = null
            // this._isLoading.next(false)
        }
    }

    saveWoordBook(title: string, language: string) {
        let sub: Subscription | null = this.wordbookHttp.postMyWoordBook(title, language)
            .subscribe((el: IWoordBook) => {
                if(el != undefined && this._woordBook.value != null){
                    this._woordBook.next(this._woordBook.value?.concat([el]) )  
                }
            })
    }

    delWoordBook(id: number) {
        let sub: Subscription | null = this.wordbookHttp.delMyWoordBook(id)
            .subscribe(
                (isDelete: boolean)=>{
                    if(isDelete != false && this._woordBook.value != null){
                        this._woordBook.next(this._woordBook.value.filter(el=> el.id != id) )  
                    }
                }, 
                (el)=>{
                    
                }
            )
    }

    putWoordBook(book: IWoordBook) {
        let sub: Subscription | null = this.wordbookHttp.putMyWoordBook(book)
            .subscribe( 
                (el: IWoordBook)=>{
                    if(el != undefined && this._woordBook.value != null){
                        this._woordBook.next(this._woordBook.value.map(e => {
                            if(e.id === el.id){
                                e = el
                            }
                            return e
                        }))
                    }
                }
            )
    }
}