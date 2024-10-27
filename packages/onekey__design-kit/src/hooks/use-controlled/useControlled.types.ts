export interface UseControlledProps<T> {
  prop?: T;

  defaultProp?: T;

  onChange?: (next: T) => void;
}

export type SetStateFn<T> = (value: T) => void;

export default UseControlledProps;
