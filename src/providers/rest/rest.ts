import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import Bundle = fhir.Bundle;
import Practitioner = fhir.Practitioner;
import {TimedWalkingTestResponse} from "../../pages/assessment/timed-walking-test-response";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://localhost:8080/fit4PAT/baseDstu3';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  /**
   * http.get() returns an Observable, which encapsulates the json response returned by the fit4PAT-server.
   * getPatients() then returns a Promise, holding this Observable.
   * For more information about asynchronous programming in JavaScript
   * see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise
   */
  getPatients() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/Patient').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getPractitioner() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/Practitioner').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getQuestionnaireResponses() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/QuestionnaireResponse').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  postTimedWalkingTestResponse(response: TimedWalkingTestResponse) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/QuestionnaireResponse', JSON.stringify(response),{
        headers: new HttpHeaders().set('Content-Type', 'application/fhir+json;charset=UTF-8')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
