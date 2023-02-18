import { IresponseTest, result, ITestResult } from './test.interface';
import { Subscription } from 'rxjs';
import { testService } from './service/test.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { testAnimation } from './test-animation';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  animations: [testAnimation]
})
export class TestComponent implements OnInit, OnDestroy {

  sub: Subscription | null = null
  test: IresponseTest | null = null
  isLoading: boolean = false
  questions: Array<boolean> | null = null//question type about word or translate
  msg: string = ''

  constructor(private testSerice: testService, private router: Router) {

    this.sub = testSerice.test$.subscribe(el => {
      
      this.test = el

      if(this.test?.letterResponses === undefined){
        return
      }

      this.questions = this.test?.letterResponses?.map(el => {
        if(el.translate === ''){
          return true
        }
        else {
          return false
        }
      })
      this.isLoading = false
    })
  }


  ngOnDestroy(): void {
    this.testSerice.resetTest()
    this.sub?.unsubscribe()
    this.sub = null
  }

  ngOnInit(): void {
    this.isLoading = true
    this.testSerice.setTest()
  }
  
  finish(){
    
    if(this.isAllAnswerEnter() === false){
      this.msg = 'enter all answers'
      return
    }
    this.isLoading = true
    
    if(this.test != null){
      
      this.testSerice.finishTest(this.test).subscribe(el => {
        // this.result = el
        //debugger
        this.isLoading = false
        this.router.navigateByUrl('/results')
      })
    }  
   //console.log(this.test)
  }

  isAllAnswerEnter(){
    if (this.test?.letterResponses === undefined){
      return false
    }

    for(let i = this.test?.letterResponses.length - 1; i >= 0; i--){

      let isNan = this.test.letterResponses[i].translate === '' 
        || this.test.letterResponses[i].word === '' 

      if (isNan === true) return false
    }

    return true
  }

  timerStop() {
    this.msg = 'time is out, but u can continue'
  }
}
