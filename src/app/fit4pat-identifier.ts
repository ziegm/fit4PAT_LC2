import Identifier = fhir.Identifier;
import code = fhir.code;

export class Fit4patIdentifier implements Identifier {
  use: code = 'usual';
  value: string;

  constructor(value: string) {
    this.value = value
  }
}
