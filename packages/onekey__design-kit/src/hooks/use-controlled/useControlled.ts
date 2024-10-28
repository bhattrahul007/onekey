import type { UseControlledProps, SetStateFn } from './useControlled.types';
import { useCallbackRef } from './../use-callback-ref/useCallbackRef';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

/**
 * A custom hook for managing controlled and uncontrolled state in React components.
 *
 * @template T - The type of the state value.
 * @param props - The properties for controlling the state.
 * @param props.prop - The controlled value from the parent component.
 * @param props.defaultProp - The default value for uncontrolled components.
 * @param props.onChange - Callback function triggered when the value changes.
 * @returns A tuple containing the current value and a function to set the value.
 */
export function useControlled<T>({ prop, defaultProp, onChange }: UseControlledProps<T>) {
  const [uncontrolledValue, setUncontrolled] = useUncontrolled({ defaultProp, onChange });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledValue;
  const handleChange = useCallbackRef(onChange);

  const onSet: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>;
        const value = typeof nextValue === 'function' ? setter(prop) : nextValue;
        if (handleChange) handleChange?.(value as T);
      } else {
        setUncontrolled(nextValue);
      }
    },
    [isControlled, prop, handleChange, setUncontrolled],
  );

  return [value, onSet] as const; // Return a tuple with the current value and setter function
}

/**
 * A custom hook for managing uncontrolled state in React components.
 *
 * @template T - The type of the state value.
 * @param props - The properties for managing uncontrolled state.
 * @param props.defaultProp - The default value for the uncontrolled component.
 * @param props.onChange - Callback function triggered when the value changes.
 * @returns A tuple containing the current value and a function to set the value.
 */
export function useUncontrolled<T>({ defaultProp, onChange }: Omit<UseControlledProps<T>, 'prop'>) {
  const [value, setValue] = useState<T | undefined>(defaultProp);
  const prevValue = useRef(value);
  const handleChange = useCallbackRef(onChange);

  useEffect(() => {
    if (value !== prevValue.current) {
      handleChange?.(value as T);
      prevValue.current = value;
    }
  }, [value, handleChange]);

  return [value, setValue] as const; // Return a tuple with the current value and setter function
}

export default useControlled;
