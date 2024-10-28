/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useEffect, useMemo, useRef } from 'react';

/**
 * A custom hook that provides a stable reference to a callback function.
 *
 * This hook allows you to safely use a callback that may change over time
 * without causing unnecessary re-renders or function references to change.
 *
 * @template T - The type of the callback function.
 * @param callback - The callback function that may change.
 * @returns A memoized function that always calls the latest version of the callback.
 */
export function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined) {
  // A ref to store the latest callback
  const callbackRef = useRef(callback);

  // Update the ref whenever the callback changes
  useEffect(() => {
    callbackRef.current = callback;
  });

  // Return a memoized function that calls the current callback ref
  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}

export default useCallbackRef;
