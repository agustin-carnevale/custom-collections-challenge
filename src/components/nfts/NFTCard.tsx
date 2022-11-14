import { FC } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { HighlightOff } from "@mui/icons-material";

import { NFT } from "../../interfaces";

interface NFTCardProps {
  nft: NFT;
  onRemove: (tokenId: string) => void;
}

export const NFTCard: FC<NFTCardProps> = ({ nft, onRemove }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "8px",
        width: "200px",
        maxWidth: "90%",
        height: "300px",
        position: "relative",
      }}
      onClick={() => {}}
    >
      <IconButton
        sx={{
          position: "absolute",
          right: "5px",
          top: "5px",
          color: "red",
          background: "white",
        }}
        onClick={() => onRemove(nft.tokenId)}
      >
        <HighlightOff />
      </IconButton>

      <CardMedia
        component="img"
        sx={{ width: "100%", height: "70%", objectFit: "cover" }}
        image={nft.image}
        alt={"No image"}
      />
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "bold" }}>
          {nft.name ?? "Untitled"}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: 400 }}>
          ID: {nft.tokenId}
        </Typography>
        <Typography variant="h6" sx={{ fontSize: "12px", fontWeight: 600 }}>
          Rank: #{nft.rarityRank ?? "unranked"}
        </Typography>
      </CardContent>
    </Card>
  );
};
