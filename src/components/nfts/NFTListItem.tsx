import { FC } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

import { NFT } from "../../interfaces";

interface NFTListItemProps {
  nft: NFT;
  index: number;
}

export const NFTListItem: FC<NFTListItemProps> = ({ nft, index }) => {
  return (
    <Draggable draggableId={nft.tokenId} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        return (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              ...provided.draggableProps.style,
            }}
          >
            <Card
              sx={{
                display: "flex",
                width: "280px",
                height: "90px",
                margin: "10px",
                border: snapshot.isDragging ? "3px dashed black" : "none",
                opacity: snapshot.isDragging ? "0.5" : "1",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: "40%", objectFit: "cover" }}
                image={nft.image}
                alt={"No image"}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "8px 0px 0px 8px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  {nft.name ?? "Untitled"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "12px", fontWeight: 400 }}
                >
                  ID: {nft.tokenId}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "12px", fontWeight: 600 }}
                >
                  Rank: #{nft.rarityRank ?? "unranked"}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );
      }}
    </Draggable>
  );
};
