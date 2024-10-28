import type { Validator } from '@onekey/ui-design/core/types';
import type { UseValidatorReturn, ValidatorState } from './useValidator.types';
import * as React from 'react';

/**
 * Initializes a Set of ValidatorStates from the provided validators.
 *
 * @param validators - An array of Validator instances.
 * @returns A Set containing the initial state of each validator.
 */
const init = <T, E>(validators: ReadonlyArray<Validator<T, E>> = []) =>
  new Set<ValidatorState<E>>(
    validators.map((validator) => ({
      status: 'initial',
      code: validator.getCode(),
      message: validator.getMessage(),
      isValid: false,
      isTouched: false,
    })),
  );

/**
 * A custom hook for managing input validation logic.
 *
 * @param validators - An array of Validator instances to be used for validation.
 * @returns An object containing the validate function and the current validation results.
 */
function useValidator<T, E>(
  validators: ReadonlyArray<Validator<T, E>> = [],
): UseValidatorReturn<T, E> {
  // State to hold the current validation results in a Set
  const [validatorsSet, setValidatorsSet] = React.useState<Set<ValidatorState<E>>>(
    init(validators),
  );

  // Effect to re-initialize the validators when the validators array changes
  React.useEffect(() => {
    setValidatorsSet(init(validators));
  }, [setValidatorsSet]);

  /**
   * Validates the given input value against all validators.
   *
   * @param value - The input value to validate.
   * @returns An array of ValidatorState objects representing the results of validation.
   */
  const validate = React.useCallback(
    (value?: T) => {
      const newValidatorSet = new Set<ValidatorState<E>>();
      validators.forEach((validator) => {
        const isValid = validator.validate(value);
        const status = isValid ? 'success' : 'error';
        newValidatorSet.add({
          status,
          isValid: isValid,
          code: validator.getCode(),
          message: validator.getMessage(),
          isTouched: true,
        });
      });
      setValidatorsSet(newValidatorSet);
      return Array.from(newValidatorSet);
    },
    [validators],
  );

  // Return the validate function and the current set of validation results
  return { validate, results: validatorsSet };
}

export default useValidator;
