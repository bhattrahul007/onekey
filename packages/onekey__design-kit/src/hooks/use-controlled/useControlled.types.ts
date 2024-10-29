/**
 * Props for the useControlled hook.
 *
 * @template T - The type of the controlled value.
 */
export interface UseControlledProps<T> {
  /**
   * The controlled value from the parent component.
   * If provided, the component will act as a controlled component.
   */
  prop?: T;

  /**
   * The default value for uncontrolled components.
   * This will be used if `prop` is not provided.
   */
  defaultProp?: T;

  /**
   * Callback function triggered when the value changes.
   * This function receives the new value as its argument.
   */
  onChange?: (next: T) => void;
}

/**
 * Type definition for a state setter function.
 *
 * @template T - The type of the value to set.
 * @param value - The new value to set.
 */
export type SetStateFn<T> = (value: T) => void;

export default UseControlledProps;
