import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {PatientSelectorPage} from "../patient-selector/patient-selector";
import Patient = fhir.Patient;
import QuestionnaireResponse = fhir.QuestionnaireResponse;
import {TimedWalkingTestResponse} from "./timed-walking-test-response";
import {RestProvider} from "../../providers/rest/rest";

@Component({
  selector: 'page-assessment',
  templateUrl: 'assessment.html'
})
export class AssessmentPage {

  patient: Patient;
  timedWalkingTestResponse: TimedWalkingTestResponse;

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
}
