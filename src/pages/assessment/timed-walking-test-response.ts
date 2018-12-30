import QuestionnaireResponse = fhir.QuestionnaireResponse;
import dateTime = fhir.dateTime;
import Patient = fhir.Patient;
import code = fhir.code;
import {Fit4PATReference} from "../../app/fit4pat-reference";
import {TimedWalkingTestResponseItem} from "./timed-walking-test-response-item";

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

  addPatient(patient: Patient): void {
    this.source = new Fit4PATReference("Patient/" + patient.id);
  }

  private actualDate(): string {
    let date = new Date();
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  }
}
