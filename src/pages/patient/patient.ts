import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import Bundle = fhir.Bundle;
import Patient = fhir.Patient;

@Component({
  selector: 'page-patient',
  templateUrl: 'patient.html'
})
export class PatientPage {

  patients: Patient[] = [];

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.getPatients();
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
}
