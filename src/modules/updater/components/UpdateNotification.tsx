import { useUpdaterUpdate } from "@/stores";

import { UpdateChangelogDialog } from "./UpdateChangelogDialog";

export function UpdateNotification() {
  const update = useUpdaterUpdate();
  if (!update) return null;
  return <UpdateChangelogDialog />;
}
