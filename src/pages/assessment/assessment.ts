import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {PatientSelectorPage} from "../patient-selector/patient-selector";
import Patient = fhir.Patient;
import QuestionnaireResponse = fhir.QuestionnaireResponse;
import {TimedWalkingTestResponse} from "./timed-walking-test-response";
import {RestProvider} from "../../providers/rest/rest";
import {TimedWalkingTestResponseItem} from "./timed-walking-test-response-item";

@Component({
  selector: 'page-assessment',
  templateUrl: 'assessment.html'
})
export class AssessmentPage {

  patient: Patient;
  timedWalkingTestResponse: TimedWalkingTestResponse;
  average = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.patient = navParams.get("patient");
    this.timedWalkingTestResponse = new TimedWalkingTestResponse(restProvider);

    if (this.patient !== undefined) {
      this.timedWalkingTestResponse.addPatient(this.patient);
    }
  }

  selectPatient() {
    this.navCtrl.push(PatientSelectorPage);
  }

  try(index: number, event: any) {
    if (this.timedWalkingTestResponse.item[index] === undefined) {
      this.timedWalkingTestResponse.item[index] = new TimedWalkingTestResponseItem("item0" + (+index + 1));
    }
    this.timedWalkingTestResponse.item[index].addAnswer(0, event.target.value);
  }

  processResponse(): void {
    this.restProvider.postTimedWalkingTestResponse(this.timedWalkingTestResponse)
      .then(data => {
        this.timedWalkingTestResponse = (data as TimedWalkingTestResponse);
      });
    this.calculateAverage();
  }

  calculateAverage(): void {
    let total = 0;
    this.timedWalkingTestResponse.item.forEach(item => {
      total = +total +  +item.answer[0].valueInteger;
    });

    if (this.timedWalkingTestResponse.item.length !== 0) {
      this.average = total / this.timedWalkingTestResponse.item.length;
    } else {
      this.average = 0;
    }
  }
}
