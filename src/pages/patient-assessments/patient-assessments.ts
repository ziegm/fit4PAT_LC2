import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import Bundle = fhir.Bundle;
import QuestionnaireResponse = fhir.QuestionnaireResponse;
import Patient = fhir.Patient;

/**
 * Generated class for the PatientAssessmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-patient-assessments',
  templateUrl: 'patient-assessments.html',
})
export class PatientAssessmentsPage {

  questionnaireResponses: QuestionnaireResponse[] = [];
  patient: Patient;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.patient = navParams.get("patient");
    this.getQuestionnaireResponses();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientAssessmentsPage');
  }

  getQuestionnaireResponses() {
    this.restProvider.getQuestionnaireResponses(this.patient)
      .then(data => {
        if ((data as Bundle).entry !== undefined) {
          (data as Bundle).entry.forEach(entry =>{
            this.questionnaireResponses.push(entry.resource as QuestionnaireResponse);
          });
        }
        console.log(this.questionnaireResponses);
      });
  }

}
