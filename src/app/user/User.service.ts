import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class UserService {
    
    private _isLoading = new BehaviorSubject<boolean>(false)
    public readonly isLoading$ = this._isLoading.asObservable()

    private _isLogin = new BehaviorSubject<boolean>(false)
    public readonly isLogin$ = this._isLogin.asObservable()

    private _name = new BehaviorSubject<string>('')
    public readonly name$ = this._name.asObservable()

    private _email = new BehaviorSubject<string>('')
    public readonly email$ = this._email.asObservable()

    private _token = new BehaviorSubject<string>('')
    public readonly token$ = this._token.asObservable()

    auth(authToken: string, authName: string){
        // console.log(authName)
        this._token.next(authToken)
        this._name.next(authName)
        this._isLogin.next(true)
    }
    
    out(){
        this._token.next('')
        this._name.next('')
        this._isLogin.next(false)
    }

    getToken(){
        return this._token.value
    }

    getName(){
        return this._name.value
    }

    isAuth(): boolean{
        return this._isLogin.value
    }

    isLogin(): Observable<boolean> {
        return this.isLogin$
    }
    
}