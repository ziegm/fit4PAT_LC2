import QuestionnaireResponseItem = fhir.QuestionnaireResponseItem;
import {TimedWalkingTestResponseItemAnswer} from "./timed-walking-test-response-item-answer";
import time = fhir.time;
import dateTime = fhir.dateTime;

export class TimedWalkingTestResponseItem implements QuestionnaireResponseItem {
  answer: TimedWalkingTestResponseItemAnswer[] = [];
  linkId: string;

  constructor(linkId: string) {
    this.linkId = linkId;
  }

  addAnswer(index: number, answer: number) {
    this.answer[index] = new TimedWalkingTestResponseItemAnswer(answer);
  }
}
