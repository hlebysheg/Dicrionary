import { WORKED_URL } from 'src/app/const';
import { UserService } from 'src/app/user/User.service';
import { Subscription, delay } from 'rxjs';
import { LoginService } from '../user/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

enum ComponentFunction{
  register,
  login
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
}) 
export class LoginComponent implements OnInit, OnDestroy{

  subLogin: Subscription | null = null
  msg = ''
  subscription: Subscription | undefined | null
  subName = ''
  subFnc: ComponentFunction = ComponentFunction.login

  loginForm: FormGroup = new FormGroup({
    "email": new FormControl("",[
      Validators.required,
      Validators.email,
      Validators.minLength(6),
      Validators.maxLength(30)
    ]),
    "name": new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15)
    ]),
    "password": new FormControl("",[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ]),
  })


  constructor(private login: LoginService, private user: UserService, private router: Router) { 

    this.subscription = login.msg$.subscribe(el=>this.msg = el)
    this.subLogin = this.user.isLogin$.subscribe(el => {
      if (el){
        this.router.navigateByUrl(WORKED_URL)
      }
    })
  }

  ngOnInit(): void {
    if(this.router.url.includes('register')){
      this.subFnc = ComponentFunction.register
      this.subName = 'Register'
    }
    if(this.router.url.includes('login')){
      this.subFnc = ComponentFunction.login
      this.subName = 'Login'
    }
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    this.subscription = null
    this.subLogin?.unsubscribe()
    this.subLogin = null
    this.msg = ''
  }

  sub(){
    if(this.subFnc === ComponentFunction.login){
      this.login.loginByForm(
        this.loginForm.value.name, 
        this.loginForm.value.email, 
        this.loginForm.value.password
      )
    }

    if(this.subFnc === ComponentFunction.register){
      this.login.register(
        this.loginForm.value.name, 
        this.loginForm.value.email, 
        this.loginForm.value.password
      ).pipe(delay(4000)).subscribe(el=>{
        this.router.navigateByUrl('/login')
      })
    }
    
    //console.log(this.loginForm.value)
  }

  lengthValidator(control: FormControl){

    let len = control.value.toString().length

    if(len < 4 && len >30){
      return {"length": true}
    }

    return null
  }
}
