import { query } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { SearchLetterPipe } from '../pipes/find.pipe';
import { UserService } from '../user/User.service';
import { woordBookService } from './service/woordBook.service';
import { By } from '@angular/platform-browser';

import { WoordBookComponent } from './woord-book.component';
import { IWoordBook } from './woord-book.interface';

describe('WoordBookComponent', () => {
  let component: WoordBookComponent;
  let fixture: ComponentFixture<WoordBookComponent>;
  //place holder date
  let woordBooks: Array<IWoordBook> = [
    {
      id:1,
      title: 'hi',
      language: 'en',
      author: 'al'
    }
  ]
  let userService: any
  let wbService: any
  let routerSpy: any
  

  beforeEach(async () => {
      //spy and fake
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    let fakeActivatedRoute = {
      paramMap: of(convertToParamMap({ letter: '1' })),
      queryParamMap: of(convertToParamMap({ query: 'active' }))};

    wbService =  jasmine.createSpyObj('woordBookService', ['setWoordBook'], {woordBook$: of(woordBooks)})
    userService = jasmine.createSpyObj('UserService', ['isLogin'])//.and.callFake(()=>of(true));
    
    await TestBed.configureTestingModule({
      declarations: [ WoordBookComponent, SearchLetterPipe],
      providers: [
        {
          provide: Router, useValue: routerSpy
        },
        {provide: woordBookService, useValue: wbService}, 
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
        RouterTestingModule.withRoutes([{path: 'my-woordbook', component: WoordBookComponent}]),
        HttpClientTestingModule]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(WoordBookComponent);
    component = fixture.componentInstance;
    userService.isLogin.and.returnValue(of(false))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('correct woordbook record', () => {
    expect(component.woordBooks).toEqual(woordBooks);
  });

  it('correct woordbook render', () => {
    component.isLoading = false
    fixture.detectChanges()
    const elem = fixture.nativeElement as HTMLElement
    expect(elem.querySelector('span[name=language]')?.textContent).toBe(woordBooks[0].language)
    expect(elem.querySelector('span[name=title]')?.textContent).toBe(woordBooks[0].title)
  });
});
