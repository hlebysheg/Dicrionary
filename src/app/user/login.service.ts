import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { URL_SERV } from '../const';
import { tokenInterface } from './tokenInterface';
import { UserService } from './User.service';


@Injectable({ providedIn: 'root' })
export class LoginService {
    
    private _msg = new BehaviorSubject<string>('')
    public readonly msg$ = this._msg.asObservable()
    private _isLoading = new BehaviorSubject<boolean>(false)
    public readonly isLoading$ = this._isLoading.asObservable()
    
    constructor (private http: HttpClient, private user: UserService){}

    loginByForm(name: string, email: string, password: string){
        let result = this.http.post<tokenInterface>(URL_SERV + '/api/UserLogin/log?', {
            name,
            email,
            password
        },
        // {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}
        {responseType: 'json'})
        
        result.subscribe ({
            next: (d: tokenInterface) => {
                window.localStorage.setItem('token', d.accesToken)
                window.localStorage.setItem('name', name)
                window.localStorage.setItem('refresh', d.refreshToken)
                this.user.auth(d.accesToken, name)
                this._msg.next('complite')
            },
            error:  (e: any) => this._msg.next('enter correct password or email')
        })
        
    }

    loginByToken(){

        let token = window.localStorage.getItem('refresh') || ''
        let name = window.localStorage.getItem('name') || ''
        
        if(token != '' && name != ''){

            this._isLoading.next(true)

            let result = this.http.post<tokenInterface>(URL_SERV + '/api/UserLogin/refresh', {token, name},
            {responseType: 'json'})

            result.subscribe ({
                next: (d: tokenInterface) => {
                    
                    window.localStorage.setItem('token', d.accesToken)
                    window.localStorage.setItem('name', name)
                    window.localStorage.setItem('refresh', d.refreshToken)
                    this.user.auth(d.accesToken, name)
                    this._msg.next('complite')
                    this._isLoading.next(false)
                },
                error:  (e: any) => {
                    // console.log(e)
                    this._msg.next('enter correct password or email')
                    this._isLoading.next(false)
                }
            })
        }
    }
    
    logOut(){

        let token = window.localStorage.getItem('refresh') || ''
        let name = window.localStorage.getItem('name') || ''

        let result = this.http.post<tokenInterface>(URL_SERV + '/api/UserLogin/logout', {token, name},
            {responseType: 'json'})
            
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('name')
        window.localStorage.removeItem('refresh')
        this.user.out()
    }

    register(name: string, email: string, password: string){
        let result = this.http.post(URL_SERV + '/api/UserLogin/reg?', {
            name,
            email,
            password
        },
        // {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}
        {responseType: 'text'})
        
        result.subscribe({
            next: (d: any)=>this._msg.next(d + ' after 3 seconds you are redirect on login page'),
            error: (e: any) => this._msg.next(e.error)
        })
        return result
    }
}