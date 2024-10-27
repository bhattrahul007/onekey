import type { UseControlledProps, SetStateFn } from './useControlled.types';
import { useCallbackRef } from './../use-callback-ref/useCallbackRef';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export function useControlled<T>({ prop, defaultProp, onChange }: UseControlledProps<T>) {
  const [uncontrolledValue, setUncontrolled] = useUncontrolled({ defaultProp, onChange });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledValue;
  const handleChange = useCallbackRef(onChange);

  const onSet = useCallback<Dispatch<SetStateAction<T | undefined>>>(
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

  return [value, onSet] as const;
}

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

  return [value, setValue] as const;
}
