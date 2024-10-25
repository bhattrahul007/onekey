import type { ReactElement, JSX } from 'react';

import type { InputTypeMap } from '@mui/joy';

export type BaseFloatingInputSizes = 'sm' | 'md' | 'lg';

export type BaseFloatingInnerInputProps = JSX.IntrinsicElements['input'] & {
  label: string;
};

export interface BaseFloatingInputState {}

export interface BaseFloatingInputProps
  extends Omit<InputTypeMap['props'], 'startDecorator' | 'endDecorator' | 'size'> {
  startIcon?: ReactElement;

  endIcon?: ReactElement;

  label: string;

  size?: BaseFloatingInputSizes;
}

export default BaseFloatingInputProps;
