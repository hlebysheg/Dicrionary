import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from '../user/login.service';
import { UserService } from '../user/User.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  name: string = ''
  subscription: Subscription | undefined | null
  
  constructor(private user: UserService, private login: LoginService, private route: Router) {
    this.subscription = user.name$.subscribe(el => this.name = el)
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    this.subscription = null
  }
  
  out(){
    this.login.logOut()
    this.route.navigateByUrl('/login')
  }
  

  

}
