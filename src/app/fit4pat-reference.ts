import Reference = fhir.Reference;
import Identifier = fhir.Identifier;
import {Fit4patIdentifier} from "./fit4pat-identifier";

export class Fit4PATReference implements Reference {
  identifier: Identifier;

  constructor(identifier: string) {
    this.identifier = new Fit4patIdentifier(identifier);
  }
}
