import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, CreateRounded } from "@mui/icons-material";

import { CustomCollection } from "../../interfaces";
import { CollectionsContext } from "../../context/collections";

interface CollectionCardProps {
  index: number;
  collection: CustomCollection;
}

export const CollectionCard: FC<CollectionCardProps> = ({
  index,
  collection,
}) => {
  const navigate = useNavigate();
  const { deleteCollection } = useContext(CollectionsContext);

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        background: "#383831",
        margin: "15px",
      }}
      onClick={() => {}}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          {collection.name}
        </Typography>
        <Typography sx={{ color: "white" }}>
          {collection.nfts.length} items
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          sx={{ color: "#e6e35c" }}
          onClick={() => navigate(`/edit/${index}`)}
        >
          <CreateRounded />
        </IconButton>
        <IconButton
          sx={{ color: "red" }}
          onClick={() => deleteCollection(index)}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};
