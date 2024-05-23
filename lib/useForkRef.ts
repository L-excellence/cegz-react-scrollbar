import * as React from "react";

interface MutableRefObject<T> {
  current: T;
}

type Ref<T> = ((instance: T | null) => void) | MutableRefObject<T> | null;

export function setRef(ref: Ref<unknown>, value: unknown) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export default function useForkRef(refA: Ref<unknown>, refB: Ref<unknown>) {
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue: unknown) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
