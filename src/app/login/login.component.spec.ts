import { LoginService } from './../user/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user/User.service';

import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginGuard } from '../routs/guard/login-guard.guard';
import { NgModule } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService = jasmine.createSpyObj('UserService', ['isLogin'], {isLogin$: of(false)})
  let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate'], {url: '//login'});
  let LnService = jasmine.createSpyObj('LoginService', ['loginByForm', 'register'], {msg$: of('hi')})
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent],
      providers: [
        {
          provide: Router, useValue: routerSpy
        },
        {provide: LoginService, useValue: LnService}, 
        {provide: UserService, useValue: userService}, 
      ],
      imports: [
        BrowserAnimationsModule,
        // RouterModule,
        RouterTestingModule.withRoutes([{path: 'login', component: LoginComponent}]),
        HttpClientTestingModule,
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
