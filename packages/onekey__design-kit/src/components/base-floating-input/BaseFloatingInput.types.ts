import {
  OnekeyValidator,
  OnekeyValidationOutcome,
  OnekeyValidationStatus,
} from '@onekey/ui-design/core/types';
import type { InputTypeMap } from '@mui/joy';
import type * as React from 'react';
import { ValidationState } from '../../hooks';

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
} & BaseFloatingInputSlotProps;

/**
 * Type representing the sizes available for the floating input.
 */
export type BaseFloatingInputSize = (typeof sizes)[number];

/**
 * Parameters for the onChange event of the input.
 *
 * @template T - The type of the input value.
 */
export type OnChangeParams<T> = {
  /**
   * The current value of the input.
   */
  value: T | undefined;

  /**
   * Indicates whether the current value is valid.
   */
  isValid: boolean;

  /**
   * An array of validation outcomes from the validators.
   */
  validationOutcomes: ReadonlyArray<OnekeyValidationOutcome>;

  event: {
    valueChanged?: boolean; // Indicates if the value has changed
    valueValidated?: boolean; // Indicates if the value has been validated
  };
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
export interface BaseFloatingInnerInputStyledProps extends BaseFloatingInputSlotProps {}

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
 * Options for rendering help text based on validation state.
 */
export type RenderHelpTextOptions = {
  showFeedback: boolean; // Indicates if feedback should be shown

  feedbackStatus: OnekeyValidationStatus; // Current validation status

  validationState: ValidationState; // Current state of validation
};

/**
 * Specifies when validation occurs for the input.
 */
export type InputValidationTrigger = 'blur' | 'typing';

/**
 * Props for the base floating input component.
 *
 * @template T - The type of the input value.
 */
export interface BaseFloatingInputProps<T>
  extends Omit<
      InputTypeMap['props'],
      'value' | 'startDecorator' | 'endDecorator' | 'size' | 'onChange' | 'defaultValue' | 'onBlur'
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
  onChange?: (values: OnChangeParams<T>) => void;

  /**
   * Callback invoked when the input loses focus.
   */
  onBlur?: (values: OnChangeParams<T>) => void;

  /**
   * An array of validators for the input value.
   */
  validators?: ReadonlyArray<OnekeyValidator<T>>;

  /**
   * Determines whether to show feedback after the input has been touched.
   */
  showFeedbackOnceTouched?: boolean;

  /**
   * A function to render help text based on validation state.
   * @param options - Options for rendering help text.
   */
  renderHelpText?: (options: RenderHelpTextOptions) => React.ReactNode;

  /**
   * Specifies when validation should be triggered.
   */
  validationTrigger?: InputValidationTrigger[];
}

/**
 * Props for the slot used in the base floating input.
 */
export interface BaseFloatingInputSlotProps {
  /**
   * The size of the input, defined by the available sizes.
   */
  inputSize?: BaseFloatingInputSize;
}

export default BaseFloatingInputProps;
