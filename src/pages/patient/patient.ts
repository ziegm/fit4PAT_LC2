import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {PatientAssessmentsPage} from "../patient-assessments/patient-assessments";
import Bundle = fhir.Bundle;
import Patient = fhir.Patient;

@Component({
  selector: 'page-patient',
  templateUrl: 'patient.html'
})
export class PatientPage {

  patients: Patient[] = [];

  /**
   * Constructor loads a list with all patients from the hapi-fhir server.
   *
   * @param navCtrl
   * @param restProvider
   */
  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.getPatients();
  }

  /**
   * Load all patients from the hapi-fhir server.
   */
  getPatients() {
    this.restProvider.getPatients()
      .then(data => {
        (data as Bundle).entry.forEach(entry =>{
          this.patients.push(entry.resource as Patient);
        });
      });
  }

  /**
   * Navigate to the patient assessment page and hand over the selected patient as a navigation paramenter.
   *
   * @param patient   The patient selected on this page
   */
  showAssessements(patient: Patient) {
    this.navCtrl.push(PatientAssessmentsPage, {patient: patient});
  }
}
