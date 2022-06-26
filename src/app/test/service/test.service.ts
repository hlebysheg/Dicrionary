import { IresponseTest, ITestResult } from '../test.interface';
import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { IWoordBook } from "../../woord-book/woord-book.interface"
import { testHttpService } from "./testHttp.service"

@Injectable({ providedIn: 'root' })
export class testService {

    private _test =  new BehaviorSubject<IresponseTest|null>(null)
    public readonly test$ = this._test.asObservable() 

    private _result = new BehaviorSubject<ITestResult|null>(null)
    public readonly result$ = this._result.asObservable() 

    constructor (private testHttp: testHttpService ){}

    setTest(){
        this.testHttp.getTest().subscribe((el:IresponseTest)=> {
            this._test.next(el)
        })
    }

    finishTest(finishTest: IresponseTest){
        let result = this.testHttp.finishTest(finishTest)
        result.subscribe(el => {
            this._result.next(el)
        })

        return result
    }

    getResult(){
        return this._result.value
    }

    tryAgain(){
        this._result.next(null)
    }
    //resets
    resetResult(){
        this._result.next(null);
    }

    resetTest(){
        this._test.next(null);
    }
}