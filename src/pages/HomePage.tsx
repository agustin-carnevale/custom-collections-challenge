import { FC, useContext } from "react";
import { Box, Typography } from "@mui/material";

import { HomeLayout } from "../components/layouts";
import { CollectionCard } from "../components/collections";
import { CollectionsContext } from "../context/collections/CollectionsContext";

const HomePage: FC = () => {
  const { customCollections } = useContext(CollectionsContext);

  return (
    <HomeLayout title="My Custom Collections">
      {customCollections.map((collection, index) => (
        <CollectionCard collection={collection} index={index} key={index} />
      ))}
      {customCollections?.length === 0 && (
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 180px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "gray", fontSize: "18px" }}>
            - You don't have any collections, click "Create" on the navbar to
            create your first one -
          </Typography>
        </Box>
      )}
    </HomeLayout>
  );
};

export default HomePage;
