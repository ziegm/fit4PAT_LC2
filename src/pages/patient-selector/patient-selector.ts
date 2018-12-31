import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {AssessmentPage} from "../assessment/assessment";
import Bundle = fhir.Bundle;
import Patient = fhir.Patient;

@Component({
  selector: 'page-patient-selector',
  templateUrl: 'patient-selector.html',
})
export class PatientSelectorPage {

  patients: Patient[] = [];

  /**
   * Constructor loads all patients from the hapi-fhir server.
   * @param navCtrl
   * @param navParams
   * @param restProvider
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.getPatients();
  }

  /**
   * Load all patients from hapi-fhir server.
   */
  getPatients() {
    this.restProvider.getPatients()
      .then(data => {
        (data as Bundle).entry.forEach(entry =>{
          this.patients.push(entry.resource as Patient);
        });
      });
  }

  // This method navigates back to the assessment page, handing over the selected patient as navigation parameter.
  selectPatient(patient: Patient) {
    this.navCtrl.push(AssessmentPage, {patient: patient});
  }
}
