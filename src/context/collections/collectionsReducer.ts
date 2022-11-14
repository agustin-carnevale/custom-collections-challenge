import { CustomCollection } from "../../interfaces";
import { CollectionsState } from "./CollectionsProvider";

type CollectionsActionType =
  | { type: "[Collections]: Load Collections"; payload: CustomCollection[] }
  | { type: "[Collections]: Add Collection"; payload: CustomCollection }
  | { type: "[Collections]: Delete Collection"; payload: number }
  | {
      type: "[Collections]: Update Collection";
      payload: { indexToUpdate: number; updatedCollection: CustomCollection };
    };

export const collectionsReducer = (
  state: CollectionsState,
  action: CollectionsActionType
): CollectionsState => {
  switch (action.type) {
    case "[Collections]: Load Collections":
      return {
        ...state,
        customCollections: action.payload,
      };
    case "[Collections]: Add Collection":
      return {
        ...state,
        customCollections: [...state.customCollections, action.payload],
      };
    case "[Collections]: Delete Collection":
      const index = action.payload;
      const collections = [...state.customCollections];
      collections.splice(index, 1);
      return {
        ...state,
        customCollections: collections,
      };
    case "[Collections]: Update Collection":
      const { indexToUpdate, updatedCollection } = action.payload;
      return {
        ...state,
        customCollections: state.customCollections.map((collection, i) => {
          if (i === indexToUpdate) {
            return updatedCollection;
          } else {
            return collection;
          }
        }),
      };

    default:
      return state;
  }
};
