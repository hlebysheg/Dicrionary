
import { HttpClient, HttpHeaders } from "@angular/common/http"

import { Injectable } from '@angular/core';
import { URL_SERV } from "src/app/const";
import { UserService } from "src/app/user/User.service";
import { Iletter } from "../letter.interfare";

@Injectable({ providedIn: 'root' })
export class LetterHttpService {

    constructor(private user: UserService, private http: HttpClient){}
    
    getMyLetter(id: number){
        //+
        const headers = new HttpHeaders().append('Authorization', `Bearer ${this.user.getToken()}`)

        let result = this.http.get<Array<Iletter>>(`${URL_SERV}/api/Letter/get/letter/${id}`, 
        {headers: headers})

        return result
    }

    postMyLetter(letter: Iletter){
        //+
        const headers = new HttpHeaders().append('Authorization', `Bearer ${this.user.getToken()}`)

        //dict id in body
        let result = this.http.post<Iletter>(URL_SERV + `/api/Letter/create/letter`,
        {...letter},
        {headers: headers})
        
        return result
    }

    putMyLetter(letter: Iletter){

        const headers = new HttpHeaders().append('Authorization', `Bearer ${this.user.getToken()}`)

        let result = this.http.put<Iletter>(URL_SERV + `/api/Letter/put/letter`,
        {...letter},
        {headers: headers})
        
        return result
    }

    delMyLetter(id: number){

        const headers = new HttpHeaders().append('Authorization', `Bearer ${this.user.getToken()}`)

        let result = this.http.delete(URL_SERV + `/api/Letter/delete/letter/${id}`,
        {headers: headers})
        
        return result
    }
}