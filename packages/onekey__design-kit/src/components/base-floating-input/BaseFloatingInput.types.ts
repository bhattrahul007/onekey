import { InputTypeMap } from '@mui/joy';

export interface BaseFloatingInputProps
  extends Omit<InputTypeMap['prop'], 'startDecorator' | 'endDecorator' | 'size'> {
  label: string;
}
