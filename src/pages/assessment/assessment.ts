import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {PatientSelectorPage} from "../patient-selector/patient-selector";
import {TimedWalkingTestResponse} from "./timed-walking-test-response";
import {RestProvider} from "../../providers/rest/rest";
import {TimedWalkingTestResponseItem} from "./timed-walking-test-response-item";
import {Fit4PATReference} from "../../app/fit4pat-reference";
import Patient = fhir.Patient;
import Bundle = fhir.Bundle;
import Practitioner = fhir.Practitioner;

@Component({
  selector: 'page-assessment',
  templateUrl: 'assessment.html'
})
export class AssessmentPage {

  patient: Patient;
  timedWalkingTestResponse: TimedWalkingTestResponse;
  average = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {

    // Get the patient, that comes back in a navigation parameter from patient selector.
    this.patient = navParams.get("patient");
    this.timedWalkingTestResponse = new TimedWalkingTestResponse();

    // Add the patient to the TimedWalkingTestResponse-Object.
    if (this.patient !== undefined) {
      this.timedWalkingTestResponse.addPatient(this.patient);

      // The default-practitioner is added in here, because we create it asynchronously, when the app is
      // being loaded for the first time. Since the practitioner might not be fully created, when this
      // constructor is being loaded, we load it, when the patient is added.
      if (this.timedWalkingTestResponse.author === undefined) {
        restProvider.getPractitioners()
          .then(data => {
            this.timedWalkingTestResponse.author = new Fit4PATReference("Practitioner/" + this.firstPractitioner(data as Bundle).id);
          });
      }
    }
  }

  /**
   * Extract the practitioner from bundle. Since at this point of time, we only have one default partitioner,
   * we always load the first one.
   *
   * @param bundle      The data bundle returned by the rest response of the hapi-fhir server
   */
  private firstPractitioner(bundle: Bundle): Practitioner {
    if (bundle.entry !== undefined) {
      return bundle.entry[0].resource as Practitioner;
    }
  }

  /**
   * This method is called, to navigate to the patient selector page.
   */
  selectPatient() {
    this.navCtrl.push(PatientSelectorPage);
  }

  /**
   * Adds the value of a try to the TimedWalkingTestResponse object.
   *
   * @param index     The position/number of the try
   * @param event     The keyup event to get the input value from
   */
  try(index: number, event: any) {
    if (this.timedWalkingTestResponse.item[index] === undefined) {
      this.timedWalkingTestResponse.item[index] = new TimedWalkingTestResponseItem("item0" + (+index + 1));
    }
    this.timedWalkingTestResponse.item[index].addAnswer(0, event.target.value);
  }

  /**
   * This method sends the previously filled TimedWalkingTestResponse to the hapi-fhir server. The calculation
   * of the average of tries is also done in here.
   */
  processResponse(): void {
    this.restProvider.postTimedWalkingTestResponse(this.timedWalkingTestResponse)
      .then(data => {
        this.timedWalkingTestResponse = (data as TimedWalkingTestResponse);
      });
    this.calculateAverage();
  }

  /**
   * This method calculates the average value of the walking test tries.
   */
  calculateAverage(): void {
    let total = 0;

    // Loop over the tries and calculate the total.
    this.timedWalkingTestResponse.item.forEach(item => {
      total = +total +  +item.answer[0].valueInteger;
    });

    // Divide the total by the number of tries to get the average.
    if (this.timedWalkingTestResponse.item.length !== 0) {
      this.average = total / this.timedWalkingTestResponse.item.length;
    } else {
      this.average = 0;
    }
  }
}
