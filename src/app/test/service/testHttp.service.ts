import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { URL_SERV } from "src/app/const"
import { UserService } from "src/app/user/User.service"
import { IresponseTest, ITestResult } from "../test.interface"


@Injectable({ providedIn: 'root' })
export class testHttpService {

    constructor(private user: UserService, private http: HttpClient){}
    
    getTest(){
        //+
        const headers = new HttpHeaders().append('Authorization', `Bearer ${this.user.getToken()}`)

        let result = this.http.get<IresponseTest>(URL_SERV + `/api/TestControllers/get/bigtest`, 
        {headers: headers})

        return result
    }

    finishTest(finishTest: IresponseTest){

        const headers = new HttpHeaders().append('Authorization', `Bearer ${this.user.getToken()}`)

        let result = this.http.post<ITestResult>(URL_SERV + `/api/TestControllers/finish/bigtest`,
        {
            id: finishTest.id,
            letterAnswer: finishTest.letterResponses,
            finalTime: new Date().toJSON()
        }, 
        {headers: headers})

        return result
    }
}