import { Select } from "@/components";
import { useWorkshopFilterStore, type WorkshopSortConfig } from "@/stores";

const SORT_OPTIONS = [
  { value: "name:asc", label: "Name (A-Z)" },
  { value: "name:desc", label: "Name (Z-A)" },
  { value: "lastModified:desc", label: "Newest First" },
  { value: "lastModified:asc", label: "Oldest First" },
];

const LABEL_MAP = Object.fromEntries(SORT_OPTIONS.map((o) => [o.value, o.label]));

function toValue(sort: WorkshopSortConfig): string {
  return `${sort.field}:${sort.direction}`;
}

function fromValue(value: string): WorkshopSortConfig {
  const [field, direction] = value.split(":") as [
    WorkshopSortConfig["field"],
    WorkshopSortConfig["direction"],
  ];
  return { field, direction };
}

export function WorkshopSortDropdown() {
  const { sort, setSort } = useWorkshopFilterStore();

  return (
    <Select.Root value={toValue(sort)} onValueChange={(v) => v && setSort(fromValue(v))}>
      <Select.Trigger className="w-48 py-1.5 text-xs">
        <Select.Value prefix="Sort by:">
          {(value: string) => LABEL_MAP[value] ?? "Sort"}
        </Select.Value>
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            {SORT_OPTIONS.map((opt) => (
              <Select.Item key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
