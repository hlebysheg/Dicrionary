import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user/User.service';
import { woordBookService } from './service/woordBook.service';
import { woordBookHttpService } from './service/woordBookHttp.service';

import { WoordBookComponent } from './woord-book.component';

describe('WoordBookComponent', () => {
  let component: WoordBookComponent;
  let fixture: ComponentFixture<WoordBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WoordBookComponent],
      providers: [
        Router, 
        woordBookService, 
        UserService, 
        {
          provide: ActivatedRoute, 
          useValue: {snapshot: {params: {id: 1}}}
        },
        NgbModal
      ],
      
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        // RouterModule,
        NgbModule,
        RouterTestingModule.withRoutes([{path: 'my-woordbook', component: WoordBookComponent}]),
        HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WoordBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
