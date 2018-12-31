/**
 * Declared module for importing json-files as objects. This is done to import the default patient and
 * practitioner in the data directory.
 * See https://hackernoon.com/import-json-into-typescript-8d465beded79 for more information.
 */
declare module "*.json" {
  const value: any;
  export default value;
}
