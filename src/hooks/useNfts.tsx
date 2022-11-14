import type { Fetcher } from "swr";
import useSWRInfinite from "swr/infinite";

import { NFT } from "../interfaces";

const LIMIT = 20;
const TOKENS_BASE_URL = "https://api.reservoir.tools/tokens/v5?sortBy=rarity";

const fetcher: Fetcher<any, string> = async (params: string) => {
  const res = await fetch(`${TOKENS_BASE_URL}${params}`);
  const data = await res.json();

  return {
    ...data,
    // take only the data needed (could not find a way to filter fields on the API request)
    tokens: data.tokens.map(({ token }: any) => ({
      tokenId: token.tokenId,
      name: token.name,
      image: token.image,
      rarity: token.rarity,
      rarityRank: token.rarityRank,
      owner: token.owner,
      collection: {
        id: token.collection.id,
        name: token.collection.name,
      },
    })),
  };
};

export const useNfts = (collectionId: string) => {
  const { data, error, size, setSize } = useSWRInfinite(
    (pageIndex: number, previousPageData: any) => {
      if (!collectionId) return null;
      if (previousPageData && !previousPageData.continuation) return null;
      if (pageIndex === 0) return `&collection=${collectionId}&limit=${LIMIT}`;
      return `&collection=${collectionId}&limit=${LIMIT}&continuation=${previousPageData.continuation}`;
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

  const nfts = (
    data ? [].concat(...data.map((page) => page.tokens)) : []
  ) as NFT[];

  return {
    nfts,
    nftsSize: size,
    nftsSetSize: setSize,
    isLoading: !error && !data,
    isError: error,
    nftsReachingEnd: isReachingEnd,
    nftsLoadingMore: isLoadingMore,
  };
};
