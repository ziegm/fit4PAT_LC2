import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {AssessmentPage} from "../assessment/assessment";
import Bundle = fhir.Bundle;
import Patient = fhir.Patient;

/**
 * Generated class for the PatientSelectorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-patient-selector',
  templateUrl: 'patient-selector.html',
})
export class PatientSelectorPage {

  patients: Patient[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.getPatients();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientSelectorPage');
  }

  getPatients() {
    this.restProvider.getPatients()
      .then(data => {
        (data as Bundle).entry.forEach(entry =>{
          this.patients.push(entry.resource as Patient);
        });
        console.log(this.patients);
      });
  }

  selectPatient(patient: Patient) {
    this.navCtrl.push(AssessmentPage, {patient: patient});
  }
}
