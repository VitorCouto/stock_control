export class ApiExceptions extends Error {
  public readonly message: string = "";
  constructor(message: string) {
    super();
    this.message = message;
  }
}