/**
 * Represents the possible states of validation.
 *
 * - 'initial': The validation has not been triggered yet.
 * - 'error': The validation has failed.
 * - 'success': The validation has passed successfully.
 */
export type OnekeyValidationStatus = 'info' | 'error' | 'success';

/**
 * A type representing a validation function.
 *
 * This type extracts the `validate` method from the `Validator` interface,
 * allowing for the definition of custom validation functions.
 */
export type OnekeyValidatorFunction<T> = Pick<OnekeyValidator<T>, 'validate'>;

/**
 * An interface representing a generic input validator.
 *
 * @template T - The type of the value to validate.
 */
export interface OnekeyValidator<T> {
  /**
   * Retrieves the unique code associated with this validator.
   *
   * @returns {string} The validator's unique code.
   */
  getCode: () => string;

  /**
   * Retrieves the message associated with this validator.
   *
   * @returns {string} The failure message if validation fails.
   */
  getMessage: () => string;

  /**
   * Validates the provided value.
   *
   * @param {T | undefined} value - The value to validate, which may be undefined.
   * @returns {boolean} `true` if the value is valid; otherwise, `false`.
   */
  validate: (value: T | undefined) => boolean;
}

/**
 * Represents the result of a validation check.
 */
export type OnekeyValidationOutcome = {
  /**
   * The unique code associated with the validation result.
   */
  code: string;

  /**
   * An optional message providing additional information about the validation outcome.
   */
  message?: string;

  /**
   * Indicates whether the validation check was successful.
   *
   * `true` if the validation passed; otherwise, `false`.
   */
  isValid: boolean;
};
