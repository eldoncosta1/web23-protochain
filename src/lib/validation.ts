/**
 * Validation class
 */
export default class Validation {
  private _success: boolean;
  private _message: string;

  /**
   * Creates a new validation object
   * @param success If the validation was successful
   * @param message The validation message, if validation is failed
   */
  constructor(success = true, message = "") {
    this._success = success;
    this._message = message;
  }

  public success(): boolean {
    return this._success;
  }

  public message(): string {
    return this._message;
  }
}
