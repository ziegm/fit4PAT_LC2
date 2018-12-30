import QuestionnaireResponseItemAnswer = fhir.QuestionnaireResponseItemAnswer;

export class TimedWalkingTestResponseItemAnswer implements QuestionnaireResponseItemAnswer {
  valueInteger: number;

  constructor(valueInteger: number) {
    this.valueInteger = valueInteger;
  }
}
