import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { __values } from 'tslib';
import { first } from 'rxjs';
import { testService } from './service/test.service';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';

import { TestComponent } from './test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { IresponseTest } from './test.interface';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let routerSpy: any
  let ttService: any
  //placeholder date.
  let test: IresponseTest | null = {
    id: 1,
    date: new Date(),
    letterResponses: [{
      id: 1,
      dictId: 1,
      word: 'hi',
      translate: '',
      anotation: ''
    }]
  }

  beforeEach(async () => {

    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    ttService = jasmine.createSpyObj('testService', ['setTest', 'finishTest'], {test$: of(test)})

    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        {
          provide: Router, useValue: routerSpy
        },
        {provide: testService, useValue: ttService}, 
      ],
      imports: [
        BrowserAnimationsModule,
        // RouterModule,
        RouterTestingModule.withRoutes([{path: 'test', component: TestComponent}]),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('record test correct', () => {
    expect(component.test).toEqual(test);
    expect(component.test?.letterResponses[0].word).toEqual(test?.letterResponses[0].word);
    // expect(component?.questions?[0]:false).toBeTrue()
  });

  it('question correct', () => {
    expect(component?.questions).toBeDefined()
    expect(component?.questions![0]).toBeTrue()
  });

  it('correct disable inputs', () => {

    component.isLoading = false
    const translateElem = fixture.debugElement.query(By.css('#translate'))
    const wordElem = fixture.debugElement.query(By.css('#word'))
    fixture.detectChanges();
    // translateElem.nativeElement.value
    expect((translateElem.nativeElement.disabled)).toBeFalse()
    expect((wordElem.nativeElement.disabled)).toBeTrue()
  });
});
