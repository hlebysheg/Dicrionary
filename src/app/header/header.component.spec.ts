import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoginService } from '../user/login.service';
import { UserService } from '../user/User.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userService = jasmine.createSpyObj('UserService', ['isLogin'], {name$: of('alex')})
  let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate'], {url: '//login'});
  let LnService = jasmine.createSpyObj('LoginService', ['logOut'], {msg$: of('hi')})
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent],
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
        HttpClientTestingModule,
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
