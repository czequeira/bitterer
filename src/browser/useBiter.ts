import { useMemo } from "react";
import { BrowserBitter } from "./BrowserBitter";

export function useBitter() {
  const bitter = useMemo(() => {
    return new BrowserBitter()
  }, [])

  return bitter
}