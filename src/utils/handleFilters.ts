import { FilterOptions } from "../types/FilterOptions";

export const handleFilters = (filters: FilterOptions) => {
  const filterObj: Record<string, unknown> = {};

  if (filters?.location) {
    filterObj.location = {
      $regex: filters.location,
      $options: "i",
    };
  }

  if (filters.maxPrice) {
    filterObj.price = {
      $lte: filters.maxPrice,
    };
  }

  if (filters.minPrice) {
    filterObj.price = {
      $gte: filters.minPrice,
    };
  }

  return filterObj;
};
