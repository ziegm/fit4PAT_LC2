import Reference = fhir.Reference;

export class Fit4PATReference implements Reference {
  reference: string;

  constructor(id: string) {
    this.reference = id;
  }
}
