import QuestionnaireResponseItemAnswer = fhir.QuestionnaireResponseItemAnswer;

/**
 * Implementing the fhir type defnitition QuestionnaireResponseItemAnswer for usage as class in this project.
 */
export class TimedWalkingTestResponseItemAnswer implements QuestionnaireResponseItemAnswer {
  valueInteger: number;

  /**
   * Construct a new answer. Since for the Timed Walking test we only need numerical answers, we only use the
   * valueInteger instance variable.
   *
   * @param valueInteger    The value of the answer
   */
  constructor(valueInteger: number) {
    this.valueInteger = valueInteger;
  }
}
