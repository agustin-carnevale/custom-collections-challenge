import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import type {
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";

import { NFT } from "../../interfaces";
import { NFTCard } from "./NFTCard";

interface CustomCollectionNFTsProps {
  nfts: NFT[];
  onRemove: (tokenId: string) => void;
}

export const CustomCollectionNFTs: FC<CustomCollectionNFTsProps> = ({
  nfts,
  onRemove,
}) => {
  return (
    <Droppable droppableId="custom-collection">
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            background: "#ebedf0",
            borderRadius: "8px",
            height: "calc(100vh - 180px)",
            opacity: snapshot.isDraggingOver ? "0.4" : "1",
            border: snapshot.isDraggingOver ? "3px dashed black" : "none",
            overflow: "scroll",
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {nfts?.map((nft) => (
            <NFTCard nft={nft} key={nft.tokenId} onRemove={onRemove} />
          ))}
          {nfts?.length === 0 && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "calc(100vh - 180px)",
                background: "#ebedf0",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body1" sx={{ color: "#adb0b8" }}>
                - Drag & Drop Here -
              </Typography>
            </Box>
          )}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
