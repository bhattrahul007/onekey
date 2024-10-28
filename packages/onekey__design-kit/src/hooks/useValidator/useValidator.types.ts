import type { ValidationOutcome, ValidationState } from '@onekey/ui-design/core/types';

/**
 * Represents the current state of a validator.
 *
 * @template E - The type of the error message or additional information associated with the validator.
 */
export type ValidatorState<E> = {
  /**
   * The current validation state of the validator.
   */
  status: ValidationState;

  /**
   * Indicates whether the validation was successful.
   */
  isValid: boolean;

  /**
   * A unique identifier for the validator.
   */
  code: string;

  /**
   * An optional message providing details about the validation failure.
   * This can be of any type specified by E.
   */
  message?: E;

  /**
   * Indicates whether the input has been interacted with by the user.
   */
  isTouched: boolean;
};

/**
 * Type definition for the validation function used in the validator hook.
 *
 * @template T - The type of the input value to validate.
 * @template E - The type of the error message or additional information associated with the validator.
 * @param value - The input value to validate.
 * @returns A readonly array of validation outcomes.
 */
export type ValidatorHookValidateFn<T, E> = (value?: T) => ReadonlyArray<ValidationOutcome<E>>;

/**
 * The return type of the useValidator hook.
 *
 * @template T - The type of the input value to validate.
 * @template E - The type of the error message or additional information associated with the validator.
 */
export type UseValidatorReturn<T, E> = {
  /**
   * The validation function that processes an input value and returns validation outcomes.
   */
  validate: ValidatorHookValidateFn<T, E>;

  /**
   * A readonly collection of validation outcomes from the current validation state.
   */
  results: ReadonlySet<ValidationOutcome<E>>;
};
