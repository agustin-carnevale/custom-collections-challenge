import { Fetcher } from "swr";
import useSWRInfinite from "swr/infinite";

import { Collection } from "../interfaces";

const LIMIT = 20;
const COLLECTIONS_BASE_URL =
  "https://api.reservoir.tools/collections/v5?sortBy=allTimeVolume";

const fetcher: Fetcher<any, string> = async (params: string) => {
  const res = await fetch(`${COLLECTIONS_BASE_URL}${params}`);
  const data = await res.json();
  return {
    ...data,
    // take only the data needed (could not find a way to filter fields on the API request)
    collections: data.collections.map((c: any) => ({ id: c.id, name: c.name })),
  };
};

export const useCollections = () => {
  const { data, error, size, setSize } = useSWRInfinite(
    (pageIndex: number, previousPageData: any) => {
      if (previousPageData && !previousPageData.continuation) return null;
      if (pageIndex === 0) return `&limit=${LIMIT}`;
      return `&limit=${LIMIT}&continuation=${previousPageData.continuation}`;
    },
    fetcher
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  const collections = (
    data ? [].concat(...data.map((page) => page.collections)) : []
  ) as Collection[];

  return {
    collections,
    size,
    setSize,
    isLoading: !error && !data,
    isError: error,
    isReachingEnd,
    isLoadingMore,
  };
};
