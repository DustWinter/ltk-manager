import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api, type AppError, type BulkInstallResult, type InstalledMod } from "@/lib/tauri";
import { libraryKeys } from "@/modules/library";
import { unwrapForQuery } from "@/utils/query";

interface ImportCslolModsArgs {
  directory: string;
  selectedFolders: string[];
}

export function useImportCslolMods() {
  const queryClient = useQueryClient();

  return useMutation<BulkInstallResult, AppError, ImportCslolModsArgs>({
    mutationFn: async ({ directory, selectedFolders }) => {
      const result = await api.importCslolMods(directory, selectedFolders);
      return unwrapForQuery(result);
    },
    onSuccess: (result) => {
      if (result.installed.length > 0) {
        queryClient.setQueryData<InstalledMod[]>(libraryKeys.mods(), (old) =>
          old ? [...old, ...result.installed] : result.installed,
        );
      }
    },
  });
}
