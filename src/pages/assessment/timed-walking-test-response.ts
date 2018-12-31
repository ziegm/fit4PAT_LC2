import QuestionnaireResponse = fhir.QuestionnaireResponse;
import dateTime = fhir.dateTime;
import Patient = fhir.Patient;
import code = fhir.code;
import {Fit4PATReference} from "../../app/fit4pat-reference";
import {TimedWalkingTestResponseItem} from "./timed-walking-test-response-item";

/**
 * Implementing the fhir type defnitition QuestionnaireResponse for usage as class in this project.
 */
export class TimedWalkingTestResponse implements QuestionnaireResponse {
  resourceType: code = "QuestionnaireResponse";
  author: fhir.Reference;
  id: fhir.id;
  identifier: fhir.Identifier;
  authored: dateTime = this.actualDate();
  item: TimedWalkingTestResponseItem[] = [];
  language: fhir.code = "de-CH";
  source: fhir.Reference;
  status: fhir.code = "in-progress";

  /**
   * Add the patients id as a reference.
   *
   * @param patient     A selected patient
   */
  addPatient(patient: Patient): void {
    this.source = new Fit4PATReference("Patient/" + patient.id);
  }

  /**
   * Generate the actual date in the format YYYY-MM-DD that is required by the hapi-fhir REST API.
   */
  private actualDate(): string {
    let date = new Date();
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }
}
