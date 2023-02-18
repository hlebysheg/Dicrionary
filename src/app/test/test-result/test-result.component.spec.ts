import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { testService } from '../service/test.service';

import { TestResultComponent } from './test-result.component';

describe('TestResultComponent', () => {
  let component: TestResultComponent;
  let fixture: ComponentFixture<TestResultComponent>;
  //spy
  let routerSpy: any
  let ttService: any

  beforeEach(async () => {

    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    ttService = jasmine.createSpyObj('testService', ['setTest', 'finishTest'], {result$: of(null)})

    await TestBed.configureTestingModule({
      declarations: [TestResultComponent],
      providers: [
        {
          provide: Router, useValue: routerSpy
        },
        {provide: testService, useValue: ttService}, 
      ],
      imports: [
        BrowserAnimationsModule,
        // RouterModule,
        RouterTestingModule.withRoutes([{path: 'test-result', component: TestResultComponent}]),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
