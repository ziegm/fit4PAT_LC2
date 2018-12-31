import QuestionnaireResponseItem = fhir.QuestionnaireResponseItem;
import {TimedWalkingTestResponseItemAnswer} from "./timed-walking-test-response-item-answer";

/**
 * Implementing the fhir type defnitition QuestionnaireResponseItem for usage as class in this project.
 */
export class TimedWalkingTestResponseItem implements QuestionnaireResponseItem {
  answer: TimedWalkingTestResponseItemAnswer[] = [];
  linkId: string;

  /**
   * Construct a new TimedWalkingTestResponseItem with its item id.
   * @param linkId    The item link id in the format itemXX
   */
  constructor(linkId: string) {
    this.linkId = linkId;
  }

  /**
   * Add an answer to an TimedWalkingTestResponseItem
   * @param index     The index/position of the answer
   * @param answer    The answer given to a TimedWalkingTestResponseItem
   */
  addAnswer(index: number, answer: number) {
    this.answer[index] = new TimedWalkingTestResponseItemAnswer(answer);
  }
}
