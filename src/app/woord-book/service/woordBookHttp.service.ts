import { HttpHeaders } from '@angular/common/http';
//constructor(private user: UserService){}

import { Injectable } from "@angular/core";
import { BehaviorSubject, first } from "rxjs";
import { Iletter } from "../../letter/letter.interfare";
import { IWoordBook } from "../woord-book.interface";
import { UserService } from '../../user/User.service';
import { HttpClient } from "@angular/common/http";
import { URL_SERV } from 'src/app/const';


@Injectable({ providedIn: 'root' })
export class woordBookHttpService {

    
    constructor(private user: UserService, private http: HttpClient){}
    
    getMyWoordBook(){
        //+
        const headers = new HttpHeaders().append('Authorization', `Bearer ${this.user.getToken()}`)

        let result = this.http.get<Array<IWoordBook>>(URL_SERV + `/api/WordBook/get/wordbook/${this.user.getName()}`, 
        {headers: headers})

        return result
    }

    postMyWoordBook(title: string, language: string){
        //+
        let book: IWoordBook = {
            title: title,
            language: language,
            author: this.user.getName(),
            id: 0,
        }

        const headers = new HttpHeaders().append('Authorization', `Bearer ${this.user.getToken()}`)

        let result = this.http.post<IWoordBook>(URL_SERV + `/api/WordBook/create/wordbook`,
        {...book},
        {headers: headers})
        
        return result
    }

    putMyWoordBook(book: IWoordBook){

        const headers = new HttpHeaders().append('Authorization', `Bearer ${this.user.getToken()}`)

        let result = this.http.put<IWoordBook>(URL_SERV + `/api/WordBook/put/wordbook`,
        {...book},
        {headers: headers})
        
        return result
    }

    delMyWoordBook(id: number){

        const headers = new HttpHeaders().append('Authorization', `Bearer ${this.user.getToken()}`)

        let result = this.http.delete<boolean>(URL_SERV + `/api/WordBook/delete/wordbook/${id}`,
        {headers: headers})
        
        return result
    }
}