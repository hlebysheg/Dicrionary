import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { LetterComponent } from './letter/letter.component';
import { WoordBookComponent } from './woord-book/woord-book.component';
import { HttpClientModule }   from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginService } from './user/login.service';
import { UserService } from './user/User.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './routs/guard/auth.guard';
import { LoginGuard } from './routs/guard/login-guard.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdModalLetter } from './letter/form/createForm';
import { SearchLetterPipe } from './pipes/find.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
import { NgbdModalContent } from './woord-book/form/createPutForm/createForm';
import { TestResultComponent } from './test/test-result/test-result.component';
import { ResultGuard } from './routs/guard/result.guard';
import { TimerComponent } from './timer/timer.component';
import { BrnCrossComponent } from './common component/brn-cross/brn-cross.component';



const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'register', 
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  { 
    path: 'my-woordbook', 
    component: WoordBookComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'letters/:id',
      component: LetterComponent,
    }]
  },
  {
    path: 'test',
    component: TestComponent,
    canActivate: [AuthGuard]
  },//TestResultComponent
  {
    path: 'results',
    component: TestResultComponent,
    canActivate: [AuthGuard]//ResultGuard
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    LetterComponent,
    WoordBookComponent,
    LoginComponent,
    HeaderComponent,
    NgbdModalContent,
    NgbdModalLetter,
    SearchLetterPipe,
    TestComponent,
    TestResultComponent,
    TimerComponent,
    BrnCrossComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [LoginService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
