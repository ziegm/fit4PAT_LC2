import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import Bundle = fhir.Bundle;
import QuestionnaireResponse = fhir.QuestionnaireResponse;
import Patient = fhir.Patient;

@Component({
  selector: 'page-patient-assessments',
  templateUrl: 'patient-assessments.html',
})
export class PatientAssessmentsPage {

  questionnaireResponses: QuestionnaireResponse[] = [];
  patient: Patient;

  /**
   * Constructor retrieves a selected patient and loads his assessment responses.
   *
   * @param navCtrl
   * @param navParams
   * @param restProvider
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.patient = navParams.get("patient");
    this.getQuestionnaireResponses();
  }

  /**
   * Load the assessment responses of a patient from the hapi-fhir server.
   */
  getQuestionnaireResponses() {
    this.restProvider.getQuestionnaireResponses(this.patient)
      .then(data => {
        if ((data as Bundle).entry !== undefined) {
          (data as Bundle).entry.forEach(entry =>{
            this.questionnaireResponses.push(entry.resource as QuestionnaireResponse);
          });
        }
      });
  }
}
