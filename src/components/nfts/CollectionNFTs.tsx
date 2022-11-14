import { FC } from "react";
import { Box, Button } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import type { DroppableProvided } from "react-beautiful-dnd";

import { NFT } from "../../interfaces";
import { NFTListItem } from "./NFTListItem";

interface CollectionNFTsProps {
  nfts: NFT[];
  size: number;
  isLoadingMore: boolean | undefined;
  isReachingEnd: boolean | undefined;
  setSize: (size: number | ((_size: number) => number)) => void;
}

export const CollectionNFTs: FC<CollectionNFTsProps> = ({
  nfts,
  size,
  isLoadingMore,
  isReachingEnd,
  setSize,
}) => {
  return (
    <Droppable droppableId="original-collection">
      {(provided: DroppableProvided) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "calc(100vh - 180px)",
            overflow: "scroll",
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {nfts?.map((nft, index) => (
            <NFTListItem nft={nft} index={index} key={nft.tokenId} />
          ))}
          {provided.placeholder}
          {nfts?.length > 0 && (
            <Button
              variant="text"
              onClick={() => setSize(size + 1)}
              disabled={isLoadingMore || isReachingEnd}
              sx={{ width: "100%" }}
            >
              {isLoadingMore
                ? "loading..."
                : isReachingEnd
                ? "no more nfts"
                : "load more"}
            </Button>
          )}
        </Box>
      )}
    </Droppable>
  );
};
