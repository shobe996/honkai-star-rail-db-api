import { SortOptions } from "honkai-star-rail-db/models";
type SortDirection = 'asc' | 'desc';


// A generic helper function (can be a class method or utility function)
export function generateSortOptions<T>(
  sortBy: string,
  sortDirection: string,
  sortMapping: Record<string, (item: T) => number | string | Date>,
  defaultGetter: (item: T) => number | string | Date = (item: any) => item.id
): SortOptions<T> {
  const getter = sortMapping[sortBy];
  return {
    by: getter ?? defaultGetter,
    direction: sortDirection as SortDirection,
  };
}