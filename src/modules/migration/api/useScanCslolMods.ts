import { useMutation } from "@tanstack/react-query";

import { api, type AppError, type CslolModInfo } from "@/lib/tauri";
import { unwrapForQuery } from "@/utils/query";

export function useScanCslolMods() {
  return useMutation<CslolModInfo[], AppError, string>({
    mutationFn: async (directory) => {
      const result = await api.scanCslolMods(directory);
      return unwrapForQuery(result);
    },
  });
}
