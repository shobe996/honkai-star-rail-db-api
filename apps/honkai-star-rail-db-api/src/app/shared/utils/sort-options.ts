import { Base, SortOptions } from "honkai-star-rail-db/models";
type SortDirection = 'asc' | 'desc';


/**
 * Generates sort options for a given type T based on the provided sort mapping and default getter.
 * @param sortBy The field to sort by.
 * @param sortDirection The direction of the sort ('asc' or 'desc').
 * @param sortMapping A mapping of field names to getter functions.
 * @param defaultGetter The default getter function if the sortBy field is not found in the sortMapping.
 * @returns The generated sort options.
 */
export function generateSortOptions<T extends Base>(
  sortBy: string,
  sortDirection: string,
  sortMapping: Record<string, (item: T) => number | string | Date>,
  defaultGetter: (item: T) => number | string | Date = (item: T) => item.id
): SortOptions<T> {
  const getter = sortMapping[sortBy];
  return {
    by: getter ?? defaultGetter,
    direction: sortDirection as SortDirection,
  };
}