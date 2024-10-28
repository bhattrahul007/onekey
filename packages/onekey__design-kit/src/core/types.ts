/**
 * Represents the possible states of validation.
 *
 * - 'initial': The validation has not been triggered yet.
 * - 'error': The validation has failed.
 * - 'success': The validation has passed successfully.
 */
export type ValidationState = 'initial' | 'error' | 'success';

/**
 * A type representing a validation function.
 *
 * This type extracts the `validate` method from the `Validator` interface,
 * allowing for the definition of custom validation functions.
 */
export type ValidatorFunction<T, E> = Pick<Validator<T, E>, 'validate'>;

/**
 * An interface representing a generic input validator.
 *
 * @template T - The type of the value to validate.
 * @template E - The type of the message returned when validation fails (defaults to 'string').
 */
export interface Validator<T, E = string> {
  /**
   * Retrieves the unique code associated with this validator.
   *
   * @returns {string} The validator's unique code.
   */
  getCode: () => string;

  /**
   * Retrieves the message associated with this validator.
   *
   * @returns {E} The failure message if validation fails.
   */
  getMessage: () => E;

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
 *
 * @template E - The type of the message returned when validation fails.
 */
export type ValidationOutcome<E> = {
  /**
   * The unique code associated with the validation result.
   */
  code: string;

  /**
   * An optional message providing additional information about the validation outcome.
   */
  message?: E;

  /**
   * Indicates whether the validation check was successful.
   *
   * `true` if the validation passed; otherwise, `false`.
   */
  isValid: boolean;
};
