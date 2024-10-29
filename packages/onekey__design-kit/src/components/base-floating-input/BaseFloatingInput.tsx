import { BaseFloatingInputProps, BaseFloatingInnerInputProps } from './BaseFloatingInput.types';
import useCallbackRef from '../../hooks/use-callback-ref';
import useControlled from '../../hooks/use-controlled';
import useValidator from '../../hooks/useValidator';
import { Box } from '@mui/joy';
import * as React from 'react';
import {
  defaultFromDOM,
  defaultToDOM,
  FloatingInputHeight,
  FloatingLabelStyled,
  FloatingInputStyled,
  BaseFloatingInputStyled,
} from './misc';

/**
 * Inner input component for the floating input.
 */
const BaseFloatingInnerInput = React.memo(
  React.forwardRef<HTMLInputElement, BaseFloatingInnerInputProps>(({ label, ...props }, ref) => {
    const id = React.useId();

    return (
      <Box width="100%" position="relative">
        <FloatingInputStyled ref={ref} id={id} {...props} />
        <FloatingLabelStyled htmlFor={id}>{label}</FloatingLabelStyled>
      </Box>
    );
  }),
);

/**
 * BaseFloatingInput component allows for an input with floating label and validation.
 *
 * @template T - The type of the input value.
 * @template E - The type of the validation error message (defaults to 'string').
 * @param props - The properties for the base floating input.
 * @returns The rendered base floating input component.
 */
export function BaseFloatingInput<T, E>({
  startIcon,
  endIcon,
  label,
  placeholder,
  size = 'sm',
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  validators,
  sx,
  slotProps,
  toDOM = defaultToDOM,
  fromDOM = defaultFromDOM,
  ...props
}: BaseFloatingInputProps<T, E>) {
  const { validate, results } = useValidator(validators);

  // Handle input change and validation
  const handleChange = React.useCallback(
    (nextValue?: T) => {
      const validationResult = validate(nextValue);
      const isValid = validationResult.every((validation) => validation.isValid);
      onChangeProp?.({ value: nextValue, valid: isValid, validationOutcomes: validationResult });
    },
    [onChangeProp, validate],
  );

  const [value, setValue] = useControlled({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: handleChange,
  });

  return (
    <BaseFloatingInputStyled
      inputSize={size ?? 'sm'}
      startDecorator={startIcon}
      endDecorator={endIcon}
      sx={{
        '--onekey-inputLabel-activeMargin': startIcon ? '-1.25em' : '0em',
        ...sx,
      }}
      slots={{ input: BaseFloatingInnerInput }}
      slotProps={{
        ...slotProps,
        input: { label, placeholder, inputSize: size, ...(slotProps?.input ?? {}) },
      }}
      value={toDOM(value)}
      onChange={useCallbackRef((e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(fromDOM(e.target.value ?? '')),
      )}
      {...props}
    />
  );
}

export default BaseFloatingInput;
