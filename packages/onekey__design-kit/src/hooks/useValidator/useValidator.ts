import type { OnekeyValidator } from '@onekey/ui-design/core/types';
import type { UseValidationReturn, ValidationState, ValidationResult } from './useValidator.types';
import * as React from 'react';

/**
 * Initializes a ValidationState from the provided validators.
 *
 * @param validators - An array of Validator instances.
 * @returns An initial state object for validation.
 */
const init = <T>(validators: ReadonlyArray<OnekeyValidator<T>> = []): ValidationState => ({
  isValidated: false,
  isTouched: false,
  outcomes: new Set<ValidationResult>(
    validators.map((validator) => ({
      code: validator.getCode(),
      message: validator.getMessage(),
      isValid: false,
    })),
  ),
});

/**
 * A custom hook for managing input validation logic.
 *
 * @param validators - An array of Validator instances to be used for validation.
 * @returns An object containing the validate function and the current validation results.
 */
export function useValidator<T>({
  validators = [],
}: {
  validators?: ReadonlyArray<OnekeyValidator<T>>;
}): UseValidationReturn<T> {
  // State to hold the current validation results
  const [validationState, setValidationState] = React.useState<ValidationState>(init(validators));

  // Effect to re-initialize the validation state when the validators array changes
  React.useEffect(() => {
    setValidationState(init(validators));
  }, [validators]);

  /**
   * Marks the input as touched, triggering validation feedback.
   */
  const touch = React.useCallback(() => {
    setValidationState((prev) => ({ ...prev, isTouched: true }));
  }, []);

  /**
   * Validates the given input value against all validators.
   *
   * @param value - The input value to validate.
   * @returns An array of ValidationResult objects representing the results of validation.
   */
  const validate = React.useCallback(
    (value?: T): Array<ValidationResult> => {
      const newOutcomes = new Set<ValidationResult>();

      validators.forEach((validator) => {
        const isValid = validator.validate(value);
        newOutcomes.add({
          isValid,
          code: validator.getCode(),
          message: validator.getMessage(),
        });
      });

      setValidationState((prev) => ({
        ...prev,
        isValidated: true,
        outcomes: newOutcomes,
      }));

      return Array.from(newOutcomes);
    },
    [validators],
  );

  /**
   * Helper function to check validation results.
   *
   * @param callback - A callback function to evaluate outcomes.
   * @returns The result of the callback evaluation.
   */
  const handleValidationCheck = React.useCallback(
    (callback: (result: ValidationResult[]) => boolean) => {
      const _outcome = Array.from(validationState.outcomes);
      const _touched = validationState.isTouched;
      const _validated = validationState.isValidated;
      return _touched && _validated && callback(_outcome);
    },
    [validationState],
  );

  /**
   * Checks if there are any validation errors.
   *
   * @returns True if there are validation errors, otherwise false.
   */
  const hasError = React.useCallback(() => {
    return handleValidationCheck((outcomes) => outcomes.some((outcome) => !outcome.isValid));
  }, [handleValidationCheck]);

  /**
   * Checks if validation was successful.
   *
   * @returns True if all validations succeeded, otherwise false.
   */
  const isSuccess = React.useCallback(() => {
    return handleValidationCheck((outcomes) => outcomes.every((outcome) => outcome.isValid));
  }, [handleValidationCheck]);

  // Return the validate function and the current state of validation
  return { validate, touch, validationState, hasError, isSuccess };
}

export default useValidator;
