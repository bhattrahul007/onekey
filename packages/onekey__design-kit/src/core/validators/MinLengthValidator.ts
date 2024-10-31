import { OnekeyValidator } from '@onekey/ui-design/core/types';

/**
 * A validator that checks if a string meets a minimum length requirement.
 */
class MinLengthValidator implements OnekeyValidator<string> {
  private readonly code = 'MIN_LENGTH';
  private readonly minLength: number;
  private readonly message: string;

  /**
   * Creates an instance of MinLengthValidator.
   *
   * @param minLength - The minimum length that the input must have. Defaults to 0.
   * @param message - An optional message to be returned when validation fails.
   */
  constructor(minLength?: number, message?: string) {
    this.minLength = minLength ?? 0;
    this.message = message ?? `Minimum ${this.minLength} length required.`;
  }

  /**
   * Retrieves the validation code.
   *
   * @returns The code associated with this validator.
   */
  getCode(): string {
    return this.code;
  }

  /**
   * Retrieves the validation message.
   *
   * @returns The message associated with this validator.
   */
  getMessage(): string {
    return this.message;
  }

  /**
   * Validates the input string against the minimum length requirement.
   *
   * @param value - The input string to validate.
   * @returns True if the input meets the minimum length requirement; otherwise, false.
   */
  validate(value: string | undefined): boolean {
    const sanitizedInput = value?.trim() ?? '';
    return this.minLength >= 0 && sanitizedInput.length >= this.minLength;
  }
}

export default MinLengthValidator;
