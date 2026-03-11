import { useEffect } from "react";

import { useUpdaterCheckForUpdate } from "@/stores";

export function useUpdateCheck({ checkOnMount = true, delayMs = 3000 } = {}) {
  const checkForUpdate = useUpdaterCheckForUpdate();

  useEffect(() => {
    if (!checkOnMount) return;

    const timeoutId = setTimeout(() => {
      checkForUpdate();
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [checkOnMount, delayMs, checkForUpdate]);
}
