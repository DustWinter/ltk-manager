import { Button, Dialog } from "@/components";
import type { BulkInstallResult, InstallProgress } from "@/lib/tauri";

import { BulkInstallProgress } from "./BulkInstallProgress";
import { BulkInstallResults } from "./BulkInstallResults";

interface ImportProgressDialogProps {
  open: boolean;
  onClose: () => void;
  progress: InstallProgress | null;
  result: BulkInstallResult | null;
}

export function ImportProgressDialog({
  open,
  onClose,
  progress,
  result,
}: ImportProgressDialogProps) {
  const isComplete = result !== null;

  return (
    <Dialog.Root open={open} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Overlay size="sm">
          <Dialog.Header>
            <Dialog.Title>{isComplete ? "Import Complete" : "Importing Mods..."}</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body className="space-y-4">
            {!isComplete && <BulkInstallProgress progress={progress} />}
            {isComplete && result && <BulkInstallResults result={result} />}
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant="filled" size="sm" onClick={onClose}>
              {isComplete ? "Done" : "Dismiss"}
            </Button>
          </Dialog.Footer>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
