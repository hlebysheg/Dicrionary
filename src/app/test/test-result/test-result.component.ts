import { Subscription } from 'rxjs';
import { result, ITestResult } from './../test.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { testService } from '../service/test.service';
import { Router } from '@angular/router';
import { testAnimation } from '../test-animation';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss'],
  animations: [testAnimation]
})
export class TestResultComponent implements OnInit, OnDestroy {

  sub: Subscription | null = null
  result: ITestResult | null = null

  constructor(private testSerice: testService, private router: Router) {
    this.sub = this.testSerice.result$.subscribe(el =>{
      this.result=el
      console.log(el)
    })
  }

  ngOnDestroy(): void {
    this.testSerice.resetResult()
    this?.sub?.unsubscribe()
    this.sub = null
  }

  ngOnInit(): void {
    //console.log('he')
  }

  again(){
    this.testSerice.resetResult()
    this.testSerice.tryAgain()
    this.router.navigateByUrl('/test')
  }
  goToDict(){
    this.testSerice.resetResult()
    this.router.navigateByUrl('/my-woordbook')
  }

}
