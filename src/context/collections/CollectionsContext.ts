import { createContext } from "react";
import { CustomCollection, NFT } from "../../interfaces";

interface CollectionsContextProps {
  customCollections: CustomCollection[];
  addCollection: (name: string, nfts: NFT[]) => void;
  deleteCollection: (index: number) => void;
  updateCollection: (index: number, name: string, nfts: NFT[]) => void;
}

export const CollectionsContext = createContext({} as CollectionsContextProps);
