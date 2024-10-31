import type { OnekeyValidationOutcome } from '@onekey/ui-design/core/types';

/**
 * Represents the result of a validation process.
 */
export type ValidationResult = {
  /** Indicates whether the input is valid. */
  isValid: boolean;

  /** A code representing the validation result. */
  code: string;

  /** An optional message providing additional context about the validation result. */
  message?: string;
};

/**
 * Represents the current state of validation for an input.
 */
export type ValidationState = {
  /**
   * Indicates whether the input has been interacted with by the user.
   */
  isTouched: boolean;

  /**
   * Indicates whether the validator has been validated at least once.
   */
  isValidated: boolean;

  /**
   * A collection of validation results from the current validation state.
   */
  outcomes: Set<ValidationResult>;
};

/**
 * Type definition for the validation function used in the validation hook.
 *
 * @template T - The type of the input value to validate.
 * @param value - The input value to validate.
 * @returns A readonly array of validation outcomes.
 */
export type ValidationFunction<T> = (value?: T) => Array<ValidationResult>;

/**
 * The return type of the useValidation hook.
 *
 * @template T - The type of the input value to validate.
 */
export type UseValidationReturn<T> = {
  /**
   * The validation function that processes an input value and returns validation outcomes.
   */
  validate: ValidationFunction<T>;

  /**
   * The current state of validation for the input.
   */
  validationState: ValidationState;

  /**
   * Marks the input as touched, triggering validation feedback.
   */
  touch: () => void;

  hasError: () => boolean;

  isSuccess: () => boolean;
};
