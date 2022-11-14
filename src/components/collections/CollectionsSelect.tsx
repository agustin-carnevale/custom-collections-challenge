import { FC } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { Collection } from "../../interfaces";

interface CollectionsSelectProps {
  collections: Collection[];
  selectedCollection: string;
  size: number;
  isReachingEnd: boolean | undefined;
  isLoadingMore: boolean | undefined;
  setSelectedCollection: (id: string) => void;
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<any[] | undefined>;
}

export const CollectionsSelect: FC<CollectionsSelectProps> = ({
  collections,
  selectedCollection,
  size,
  isLoadingMore,
  isReachingEnd,
  setSelectedCollection,
  setSize,
}) => {
  return (
    <FormControl fullWidth sx={{ marginBottom: "15px" }}>
      <InputLabel id="collections-select-label">Collections</InputLabel>
      <Select
        labelId="collections-select-label"
        id="collections-select"
        value={selectedCollection}
        label="Collections"
        onChange={(e) => setSelectedCollection(e.target.value)}
      >
        {collections.map((collection) => (
          <MenuItem value={collection.id} key={collection.id}>
            {collection.name}
          </MenuItem>
        ))}
        <Button
          variant="text"
          onClick={() => setSize(size + 1)}
          disabled={isLoadingMore || isReachingEnd}
          sx={{ width: "100%" }}
        >
          {isLoadingMore
            ? "loading..."
            : isReachingEnd
            ? "no more collections"
            : "load more"}
        </Button>
      </Select>
    </FormControl>
  );
};
