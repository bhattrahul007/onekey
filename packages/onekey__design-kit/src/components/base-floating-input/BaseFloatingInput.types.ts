import { Validator, ValidationOutcome } from '@onekey/ui-design/core/types';
import type { InputTypeMap } from '@mui/joy';
import type * as React from 'react';

// Define the available sizes for the input.
const sizes = ['sm', 'md', 'lg'] as const;

/**
 * Props for the inner input component of a floating input.
 *
 * @extends React.JSX.IntrinsicElements['input'] - Inherits all properties of a standard input element.
 */
export type BaseFloatingInnerInputProps = React.JSX.IntrinsicElements['input'] & {
  /**
   * The label displayed for the input.
   */
  label: string;

  /**
   * The size of the input, defined by the available sizes.
   */
  inputSize: BaseFloatingInputSize;
};

/**
 * Type representing the sizes available for the floating input.
 */
export type BaseFloatingInputSize = (typeof sizes)[number];

/**
 * Parameters for the onChange event of the input.
 *
 * @template T - The type of the input value.
 * @template E - The type of the validation error message.
 */
export type OnChangeParams<T, E> = {
  /**
   * The current value of the input.
   */
  value: T | undefined;

  /**
   * Indicates whether the current value is valid.
   */
  valid: boolean;

  /**
   * An array of validation outcomes from the validators.
   */
  validationOutcomes: ReadonlyArray<ValidationOutcome<E>>;
};

/**
 * Styled properties for the base floating input root element.
 */
export interface BaseFloatingInputStyledProps {
  /**
   * The size of the input to style.
   */
  rootSize: BaseFloatingInputSize;
}

/**
 * Styled properties for the inner input element.
 */
export interface BaseFloatingInnerInputStyledProps {
  /**
   * The size of the inner input.
   */
  inputSize: BaseFloatingInputSize;
}

/**
 * Interface for transforming DOM values to/from the input value type.
 *
 * @template T - The type of the input value.
 */
export interface DomTransformer<T> {
  /**
   * Transforms the value from the input to a string for the DOM.
   * @param value - The value to convert to a DOM string.
   * @returns The string representation of the value.
   */
  toDOM?: (value?: T) => string;

  /**
   * Transforms the string value from the DOM back to the input value type.
   * @param value - The string value to convert.
   * @returns The converted value of type T.
   */
  fromDOM?: (value?: string) => T;
}

/**
 * Props for the base floating input component.
 *
 * @template T - The type of the input value.
 * @template E - The type of the validation error message (defaults to 'string').
 */
export interface BaseFloatingInputProps<T, E = 'string'>
  extends Omit<
      InputTypeMap['props'],
      'value' | 'startDecorator' | 'endDecorator' | 'size' | 'onChange' | 'defaultValue'
    >,
    DomTransformer<T> {
  /**
   * The label displayed for the input.
   */
  label: string;

  /**
   * The size of the input.
   */
  size?: BaseFloatingInputSize;

  /**
   * An optional icon displayed at the start of the input.
   */
  startIcon?: React.ReactElement;

  /**
   * An optional icon displayed at the end of the input.
   */
  endIcon?: React.ReactElement;

  /**
   * The current value of the input.
   */
  value?: T;

  /**
   * The default value of the input.
   */
  defaultValue?: T;

  /**
   * Callback invoked when the value changes.
   * @param values - The parameters for the change event.
   */
  onChange?: (values: OnChangeParams<T, E>) => void;

  /**
   * An array of validators for the input value.
   */
  validators?: ReadonlyArray<Validator<T, E>>;
}

export default BaseFloatingInputProps;
