import { useMemo } from "react";
import { LuX } from "react-icons/lu";

import { Combobox, type ComboboxOption, useComboboxFilter } from "@/components";
import type { FilterOptions } from "@/modules/library/api";
import { getMapLabel, getTagLabel } from "@/modules/library/utils/labels";
import { useHasActiveFilters, useLibraryFilterStore } from "@/stores";

interface FilterBarProps {
  filterOptions: FilterOptions;
}

export function FilterBar({ filterOptions }: FilterBarProps) {
  const {
    selectedTags,
    selectedChampions,
    selectedMaps,
    setTags,
    setChampions,
    setMaps,
    clearFilters,
  } = useLibraryFilterStore();
  const hasActive = useHasActiveFilters();

  const tagOptions = useMemo(
    () => filterOptions.tags.map((t) => ({ value: t, label: getTagLabel(t) })),
    [filterOptions.tags],
  );
  const championOptions = useMemo(
    () => filterOptions.champions.map((c) => ({ value: c, label: c })),
    [filterOptions.champions],
  );
  const mapOptions = useMemo(
    () => filterOptions.maps.map((m) => ({ value: m, label: getMapLabel(m) })),
    [filterOptions.maps],
  );

  return (
    <div className="flex items-start gap-3 border-b border-surface-700 px-4 py-2">
      <FilterCombobox
        label="Tags"
        placeholder="Filter tags..."
        options={tagOptions}
        selected={selectedTags}
        onChange={setTags}
      />
      <FilterCombobox
        label="Champions"
        placeholder="Filter champions..."
        options={championOptions}
        selected={selectedChampions}
        onChange={setChampions}
      />
      <FilterCombobox
        label="Maps"
        placeholder="Filter maps..."
        options={mapOptions}
        selected={selectedMaps}
        onChange={setMaps}
      />
      {hasActive && (
        <button
          onClick={clearFilters}
          className="mt-1 flex shrink-0 items-center gap-1 text-xs text-surface-400 hover:text-surface-200"
        >
          <LuX className="h-3 w-3" />
          Clear all
        </button>
      )}
    </div>
  );
}

function FilterCombobox({
  label,
  placeholder,
  options,
  selected,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: ComboboxOption[];
  selected: Set<string>;
  onChange: (values: Set<string>) => void;
}) {
  const filter = useComboboxFilter();

  const selectedOptions = useMemo(
    () => options.filter((o) => selected.has(o.value)),
    [options, selected],
  );

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="text-xs font-medium tracking-wide text-surface-500 uppercase">{label}</span>
      <Combobox.Root<ComboboxOption, true>
        multiple
        value={selectedOptions}
        onValueChange={(opts) => onChange(new Set(opts.map((o) => o.value)))}
        items={options}
        filter={(item, query) => filter.contains(item, query, (o) => o.label)}
        itemToStringLabel={(item) => item.label}
        itemToStringValue={(item) => item.value}
      >
        <div className="flex min-h-[34px] flex-wrap items-center gap-1 rounded-lg border border-surface-500 bg-surface-700 px-2 py-1 transition-colors focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 hover:border-surface-400">
          <Combobox.Chips className="contents">
            {selectedOptions.map((opt) => (
              <Combobox.Chip key={opt.value} className="gap-0.5 rounded px-1.5 text-xs">
                {opt.label}
                <Combobox.ChipRemove />
              </Combobox.Chip>
            ))}
          </Combobox.Chips>
          <Combobox.Input
            placeholder={selectedOptions.length === 0 ? placeholder : ""}
            className="w-0 min-w-[60px] flex-1 rounded-none border-0 bg-transparent px-1 py-0 text-xs hover:border-0 focus:border-0 focus:ring-0"
          />
          <Combobox.Trigger className="shrink-0">
            <Combobox.Icon />
          </Combobox.Trigger>
        </div>
        <Combobox.Portal>
          <Combobox.Positioner>
            <Combobox.Popup>
              <Combobox.List>
                {(item: ComboboxOption) => (
                  <Combobox.Item key={item.value} value={item}>
                    {item.label}
                  </Combobox.Item>
                )}
              </Combobox.List>
              <Combobox.Empty />
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
}
