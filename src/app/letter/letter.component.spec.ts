import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { SearchLetterPipe } from '../pipes/find.pipe';
import { UserService } from '../user/User.service';

import { LetterComponent } from './letter.component';

describe('LetterComponent', () => {
  let component: LetterComponent;
  let fixture: ComponentFixture<LetterComponent>;
  const letter = [{
    word: 'string',
    translate: 'string',
    anotation: 'string',
    id: 1,
    dictId: 1,
  }]
  let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  let fakeActivatedRoute = {
    paramMap: of(convertToParamMap({ letter: '1' })),
    queryParamMap: of(convertToParamMap({ query: 'active' }))};

  let LrComponent =  jasmine.createSpyObj('LetterComponent', [''], {letters$$: of(letter)})
  let userService = jasmine.createSpyObj('UserService', ['isLogin'])//.and.callFake(()=>of(true));
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterComponent, SearchLetterPipe],
      providers: [
        {
          provide: Router, useValue: routerSpy
        },
        {provide: LetterComponent, useValue: LrComponent}, 
        {provide: UserService, useValue: userService}, 
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRoute,
        },
        NgbModal
      ],
      imports: [
        BrowserAnimationsModule,
        // RouterModule,
        RouterTestingModule.withRoutes([{path: 'letter', component: LetterComponent}]),
        HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
