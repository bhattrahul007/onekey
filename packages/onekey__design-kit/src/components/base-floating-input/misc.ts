import { Input, styled } from '@mui/joy';

/**
 * Converts a string value from the DOM to the specified type T.
 *
 * @template T - The target type to convert to.
 * @param value - The string value to convert.
 * @returns The value cast to type T.
 */
export const defaultFromDOM = <T>(value?: string): T => value as unknown as T;

/**
 * Converts a value of type T to a string for use in the DOM.
 *
 * @template T - The type of the value to convert.
 * @param value - The value to convert.
 * @returns The string representation of the value.
 */
export const defaultToDOM = <T>(value?: T): string => String(value ?? '');

/**
 * Enum-like object defining the available sizes for floating inputs.
 */
export const FloatingInputSizes = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

/**
 * Object defining the heights for each floating input size.
 */
export const FloatingInputHeight = {
  [FloatingInputSizes.SM]: '2.125rem',
  [FloatingInputSizes.MD]: '2.625rem',
  [FloatingInputSizes.LG]: '3rem',
};

/**
 * Styled component for the floating input element.
 */
export const FloatingInputStyled = styled('input')(() => ({
  border: 0,
  outline: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'var(--onekey-input-fontSize, 1em)',
  fontStyle: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  textOverflow: 'ellipsis',

  '&::placeholder': {
    opacity: 0,
    transition: '0.1s ease-out',
  },

  '&:focus::placeholder': {
    opacity: 1,
  },

  '&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label': {
    top: '-0.5em',
    left: 'var(--onekey-inputLabel-activeMargin, 0em)',
    fontSize: '.875rem',
    backgroundColor: '#fff',
    padding: '0 .5rem',
  },

  '&:focus ~ label': {
    color: 'var(--Input-focusedHighlight)',
  },

  '&:-webkit-autofill': {
    alignSelf: 'stretch', // To fill the height of the root slot
  },
}));

/**
 * Styled component for the floating label associated with the input.
 */
export const FloatingLabelStyled = styled('label')(() => ({
  position: 'absolute',
  top: 'calc((var(--onekey-input-minHeight) - 1em) / 2)',
  left: 0,
  fontSize: '1em',
  fontWeight: 500,
  lineHeight: 0.875,
  zIndex: 1,
  transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
}));

/**
 * Styled component for the base floating input wrapper.
 */
export const BaseFloatingInputStyled = styled(Input)(() => ({
  minHeight: 'var(--onekey-input-minHeight)',
  padding: '0 .5rem',
  marginTop: '.5rem',
  borderRadius: '.25rem',
}));
