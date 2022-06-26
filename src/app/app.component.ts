import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { delay, fromEvent, interval } from 'rxjs';
import { LoginService } from './user/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //
  sub: Subscription | null = null
  loading: boolean = false

  constructor (private login: LoginService) {
    this.sub = this.login.isLoading$.subscribe(el => {
      this.loading = el
    })
  }
  
  ngOnInit(): void {
    
    this.login.loginByToken()
  }
}
