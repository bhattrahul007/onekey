import * as React from 'react';

import { Box, Input, styled } from '@mui/joy';
import type {
  BaseFloatingInnerInputProps,
  BaseFloatingInputProps,
  BaseFloatingInputState,
} from './BaseFloatingInput.types';

const BaseFloatingInnerInputStyled = styled('input')(() => ({
  border: 'none', // remove the native input border
  minWidth: 0, // remove the native input width
  outline: 0, // remove the native input outline
  padding: 0, // remove the native input padding
  width: '100%',
  height: '100%',
  color: 'inherit',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
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
    fontSize: '0.85rem',
    padding: '0 .25rem',
    backgroundColor: '#fff',
  },
  '&:focus ~ label': {
    color: 'var(--Input-focusedHighlight)',
  },
  '&:-webkit-autofill': {
    alignSelf: 'stretch', // to fill the height of the root slot
  },
}));

const BaseFloatingInnerLabelStyled = styled('label')(({ theme }) => ({
  position: 'absolute',
  lineHeight: 1,
  left: 0,
  top: 'calc((var(--Input-minHeight) - 1em - .25em) / 2)',
  fontSize: '1em',
  color: theme.vars.palette.text.tertiary,
  fontWeight: theme.vars.fontWeight.md,
  transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 1,
}));

export class BaseFloatingInput extends React.PureComponent<
  BaseFloatingInputProps,
  BaseFloatingInputState
> {
  constructor(props: BaseFloatingInputProps) {
    super(props);
  }

  static InnerInput = React.forwardRef<HTMLInputElement, BaseFloatingInnerInputProps>(
    ({ label, ...props }, ref) => {
      const id = React.useId();

      return (
        <>
          <Box width="100%" position="relative">
            <BaseFloatingInnerInputStyled id={id} ref={ref} {...props} />
            <BaseFloatingInnerLabelStyled htmlFor={id}>{label}</BaseFloatingInnerLabelStyled>
          </Box>
        </>
      );
    },
  );

  render() {
    const { label, placeholder, size, sx, slotProps, startIcon, endIcon, ...rest } = this.props;
    return (
      <React.Fragment>
        <Input
          startDecorator={startIcon}
          endDecorator={endIcon}
          sx={{
            '--Onekey-input-size': size ?? 'sm',
            ...sx,
          }}
          slots={{ input: BaseFloatingInput.InnerInput }}
          slotProps={{
            ...slotProps,
            input: {
              label,
              placeholder,
              ...slotProps?.input,
            },
          }}
          {...rest}
        />
      </React.Fragment>
    );
  }
}

export default BaseFloatingInput;
