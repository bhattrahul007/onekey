import { BaseFloatingInputProps, BaseFloatingInnerInputProps } from './BaseFloatingInput.types';
import { useCallbackRef, useControlled, useValidator } from '@onekey/ui-design/hooks';
import { OnekeyValidationStatus } from '@onekey/ui-design/core/types';
import { Box } from '@mui/joy';
import * as React from 'react';
import {
  defaultFromDOM,
  defaultToDOM,
  FloatingLabelStyled,
  FloatingInputStyled,
  BaseFloatingInputStyled,
} from './misc';

/**
 * Inner input component for the floating input.
 * Uses React.memo to prevent unnecessary re-renders.
 */
const BaseFloatingInnerInput = React.memo(
  React.forwardRef<HTMLInputElement, BaseFloatingInnerInputProps>(({ label, ...props }, ref) => {
    const id = React.useId(); // Generates a unique ID for accessibility

    return (
      <Box width="100%" position="relative">
        <FloatingInputStyled ref={ref} id={id} {...props} />
        <FloatingLabelStyled htmlFor={id}>{label}</FloatingLabelStyled>
      </Box>
    );
  }),
);

/**
 * BaseFloatingInput component allows for an input with a floating label and validation.
 *
 * @template T - The type of the input value.
 * @param props - The properties for the base floating input.
 * @returns The rendered base floating input component.
 */
export function BaseFloatingInput<T>({
  startIcon,
  endIcon,
  label,
  placeholder,
  size = 'sm',
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  validators,
  validationTrigger = ['blur'],
  sx,
  slotProps,
  toDOM = defaultToDOM, // Function to convert internal value to DOM format
  fromDOM = defaultFromDOM, // Function to convert DOM value to internal format
  renderHelpText,
  showFeedbackOnceTouched = false,
  onBlur,
  ...props
}: BaseFloatingInputProps<T>) {
  const { validate, touch, validationState, hasError, isSuccess } = useValidator({ validators });

  // Handle input change and validation
  const handleChange = React.useCallback(
    (nextValue?: T) => {
      let isValid = null; // Initialize validity state
      let validationOutcomes = Array.from(validationState.outcomes); // Get current validation outcomes

      // If validation trigger is 'typing', validate the input on change
      if (validationTrigger.includes('typing')) {
        validationOutcomes = validate(nextValue); // Validate new value
        isValid = validationOutcomes.every((validation) => validation.isValid); // Check if all validations passed
      }

      // Touch validation state if it hasn't been touched yet
      if (!validationState.isTouched) touch();

      // Call the onChange handler if provided
      if (onChangeProp) {
        onChangeProp({
          value: nextValue,
          isValid: isValid === null ? false : isValid, // Determine final validity
          validationOutcomes,
          event: { valueChanged: true, valueValidated: isValid !== null },
        });
      }
    },
    [onChangeProp, validate, validationState, touch],
  );

  // Controlled state for the input value
  const [value, setValue] = useControlled({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: handleChange,
  });

  // Handle blur event for validation
  const handleBlur = React.useCallback(() => {
    if (validationTrigger.includes('blur')) {
      const validationOutcomes = validate(value); // Validate on blur
      const isValid = validationOutcomes.every((validation) => validation.isValid); // Check validity

      // Call the onBlur handler if provided
      if (onBlur) {
        onBlur({
          value,
          isValid,
          validationOutcomes,
          event: { valueChanged: false, valueValidated: true },
        });
      }
    }
  }, [validate, value, validationTrigger, onBlur]);

  // Determine feedback status based on validation outcomes
  const feedbackStatus: OnekeyValidationStatus = hasError()
    ? 'error'
    : isSuccess()
      ? 'success'
      : 'info';

  // Show feedback if there's an error or if the input has value and feedback is enabled
  const showFeedback = feedbackStatus !== 'info' && (showFeedbackOnceTouched || !!value);

  return (
    <Box width="100%">
      <Box width={'100%'}>
        <BaseFloatingInputStyled
          rootSize={size}
          startDecorator={startIcon}
          endDecorator={endIcon}
          sx={{
            '--onekey-inputLabel-activeMargin': startIcon ? '-1.25em' : '0em', // Adjust label position based on icon presence
            ...sx,
          }}
          slots={{ input: BaseFloatingInnerInput }} // Define inner input component
          slotProps={{
            ...slotProps,
            input: {
              label,
              placeholder,
              inputSize: size,
              ...(slotProps?.input ?? {}),
            },
          }}
          value={toDOM(value)} // Convert value to DOM format
          onChange={useCallbackRef(
            (e: React.ChangeEvent<HTMLInputElement>) => setValue(fromDOM(e.target.value ?? '')), // Convert DOM value to internal format on change
          )}
          onBlur={handleBlur} // Attach blur handler
          {...props} // Spread additional props
        />
      </Box>
      {/* Display validation error messages or feedback if needed */}
      {renderHelpText && (
        <Box width={'100%'}>
          {renderHelpText({ showFeedback, feedbackStatus, validationState })} // Render help text
          based on validation state
        </Box>
      )}
    </Box>
  );
}

export default BaseFloatingInput;
