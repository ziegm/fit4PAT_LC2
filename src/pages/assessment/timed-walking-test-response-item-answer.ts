import QuestionnaireResponseItemAnswer = fhir.QuestionnaireResponseItemAnswer;
import dateTime = fhir.dateTime;
import time = fhir.time;

export class TimedWalkingTestResponseItemAnswer implements QuestionnaireResponseItemAnswer {
  valueInteger: number;

  constructor(valueInteger: number) {
    this.valueInteger = valueInteger;
  }
}
