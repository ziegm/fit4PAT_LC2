import QuestionnaireResponse = fhir.QuestionnaireResponse;
import {RestProvider} from "../../providers/rest/rest";
import Identifier = fhir.Identifier;
import dateTime = fhir.dateTime;
import Patient = fhir.Patient;
import Practitioner = fhir.Practitioner;
import {Fit4PATReference} from "../../app/fit4pat-reference";
import Bundle = fhir.Bundle;

export class TimedWalkingTestResponse implements QuestionnaireResponse {
  author: fhir.Reference;
  id: fhir.id;
  identifier: fhir.Identifier;
  authored: dateTime = this.actualDate();
  item: fhir.QuestionnaireResponseItem[] = [];
  language: fhir.code = "de-CH";
  source: fhir.Reference;
  status: fhir.code = "in-progress";

  constructor(restProvider: RestProvider) {
    restProvider.getPractitioner()
      .then(data => {
        this.author = new Fit4PATReference(this.firstPractitioner(data as Bundle).identifier[0].value);
      });
  }

  addPatient(patient: Patient): void {
    this.source = new Fit4PATReference(patient.identifier[0].value);
    console.log(this);
  }

  private actualDate(): string {
    let date = new Date();
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  }

  private firstPractitioner(bundle: Bundle): Practitioner {
    return bundle.entry[0].resource as Practitioner;
  }
}
