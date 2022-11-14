import { FC, useEffect, useReducer } from "react";

import { CustomCollection, NFT } from "../../interfaces";
import { CollectionsContext } from "./CollectionsContext";
import { collectionsReducer } from "./collectionsReducer";

export interface CollectionsState {
  customCollections: CustomCollection[];
}
const COLLECTIONS_INITIAL_STATE: CollectionsState = {
  customCollections: [],
};
interface CollectionsProviderProps {
  children?: React.ReactNode;
}

export const CollectionsProvider: FC<CollectionsProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    collectionsReducer,
    COLLECTIONS_INITIAL_STATE
  );

  // load collections from LocalStorage
  useEffect(() => {
    const data = localStorage.getItem("custom-collections");
    const collections = data ? JSON.parse(data) : null;

    if (collections) {
      dispatch({
        type: "[Collections]: Load Collections",
        payload: collections,
      });
    }
  }, []);

  // save collections to LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "custom-collections",
      JSON.stringify(state.customCollections)
    );
  }, [state]);

  // actions
  const addCollection = (name: string, nfts: NFT[]) => {
    dispatch({
      type: "[Collections]: Add Collection",
      payload: { name, nfts },
    });
  };

  const deleteCollection = (index: number) => {
    dispatch({
      type: "[Collections]: Delete Collection",
      payload: index,
    });
  };

  const updateCollection = (index: number, name: string, nfts: NFT[]) => {
    dispatch({
      type: "[Collections]: Update Collection",
      payload: { indexToUpdate: index, updatedCollection: { name, nfts } },
    });
  };

  return (
    <CollectionsContext.Provider
      value={{
        ...state,
        addCollection,
        deleteCollection,
        updateCollection,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
