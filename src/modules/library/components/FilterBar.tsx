import { useMemo } from "react";
import { LuX } from "react-icons/lu";

import { MultiSelect, type MultiSelectOption } from "@/components";
import type { FilterOptions } from "@/modules/library/api";
import { getMapLabel, getTagLabel } from "@/modules/library/utils/labels";
import { useHasActiveFilters, useLibraryFilterStore } from "@/stores";

const WELL_KNOWN_TAGS = [
  "league-of-legends",
  "tft",
  "champion-skin",
  "map-skin",
  "ward-skin",
  "ui",
  "hud",
  "font",
  "sfx",
  "announcer",
  "structure",
  "minion",
  "jungle-monster",
  "misc",
];

const WELL_KNOWN_MAPS = ["summoners-rift", "aram", "teamfight-tactics", "arena", "swarm"];

function mergeOptions(
  wellKnown: string[],
  fromMods: string[],
  getLabel: (value: string) => string,
): MultiSelectOption[] {
  const seen = new Set<string>();
  const options: MultiSelectOption[] = [];
  for (const value of wellKnown) {
    seen.add(value);
    options.push({ value, label: getLabel(value) });
  }
  for (const value of fromMods) {
    if (!seen.has(value)) {
      options.push({ value, label: getLabel(value) });
    }
  }
  return options;
}

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
    () => mergeOptions(WELL_KNOWN_TAGS, filterOptions.tags, getTagLabel),
    [filterOptions.tags],
  );
  const championOptions = useMemo(
    () => filterOptions.champions.map((c) => ({ value: c, label: c })),
    [filterOptions.champions],
  );
  const mapOptions = useMemo(
    () => mergeOptions(WELL_KNOWN_MAPS, filterOptions.maps, getMapLabel),
    [filterOptions.maps],
  );

  return (
    <div className="flex items-center gap-3 border-b border-surface-700 px-4 py-2">
      <MultiSelect
        label="Tags"
        options={tagOptions}
        selected={selectedTags}
        onChange={setTags}
        placeholder="Search tags..."
      />
      <MultiSelect
        label="Champions"
        options={championOptions}
        selected={selectedChampions}
        onChange={setChampions}
        placeholder="Search champions..."
      />
      <MultiSelect
        label="Maps"
        options={mapOptions}
        selected={selectedMaps}
        onChange={setMaps}
        placeholder="Search maps..."
      />
      {hasActive && (
        <button
          onClick={clearFilters}
          className="flex shrink-0 items-center gap-1 text-xs text-surface-400 hover:text-surface-200"
        >
          <LuX className="h-3 w-3" />
          Clear all
        </button>
      )}
    </div>
  );
}
