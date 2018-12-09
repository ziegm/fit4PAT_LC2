import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";

@Component({
  selector: 'page-patient',
  templateUrl: 'patient.html'
})
export class PatientPage {
  patientBundle: any = {
    entry: []
  };

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.getPatients();
  }

  getPatients() {
    this.restProvider.getPatients()
      .then(data => {
        this.patientBundle = data;
        console.log(this.patientBundle);
      });
  }
}
