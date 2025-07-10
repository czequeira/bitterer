import { useMemo } from "react";
import { BrowserBitter } from "./BrowserBitter";

export function useBit<T>(name: string): T {
  const bit = useMemo(() => {
    const bitter = new BrowserBitter()
    return bitter.getBit<T>(name)
  }, [])

  return bit
}