import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, TextField } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";

import { CreateLayout } from "../components/layouts";
import { CollectionsSelect } from "../components/collections/CollectionsSelect";
import { CollectionNFTs } from "../components/nfts/CollectionNFTs";
import { CustomCollectionNFTs } from "../components/nfts/CustomCollectionNFTs";
import { CollectionsContext } from "../context/collections";
import { useCollections, useNfts } from "../hooks";
import { NFT } from "../interfaces";

const CreateCustomCollectionPage: FC = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedNFTs, setSelectedNFTs] = useState<NFT[]>([]);

  const { customCollections, addCollection, updateCollection } =
    useContext(CollectionsContext);

  const { collections, size, setSize, isReachingEnd, isLoadingMore } =
    useCollections();

  const { nfts, nftsReachingEnd, nftsLoadingMore, nftsSize, nftsSetSize } =
    useNfts(selectedCollection);

  // if there is an index (edit mode) check if valid
  useEffect(() => {
    if (index) {
      const i = parseInt(index);
      if (isNaN(i) || i >= customCollections.length) {
        navigate("/");
      } else {
        setName(customCollections[i].name);
        setSelectedNFTs(customCollections[i].nfts);
      }
    }
  }, [index, navigate, customCollections]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    if (
      source.droppableId === "original-collection" &&
      destination.droppableId === "custom-collection"
    ) {
      // check if valid source
      if (!nfts || source.index >= nfts.length) return;

      // check is not already in the list (to avoid duplicates)
      const nftToAdd = nfts[source.index];
      const addedPreviously = selectedNFTs.find(
        (n) =>
          n.tokenId === nftToAdd.tokenId &&
          n.collection.id === nftToAdd.collection.id
      );
      if (!addedPreviously) {
        setSelectedNFTs([...selectedNFTs, nftToAdd]);
      }
    }
  };

  const onSave = () => {
    if (index) {
      updateCollection(parseInt(index), name, selectedNFTs);
    } else {
      addCollection(name, selectedNFTs);
    }
    navigate("/");
  };

  const onRemoveNft = (tokenId: string) => {
    setSelectedNFTs(selectedNFTs.filter((n) => n.tokenId !== tokenId));
  };

  return (
    <CreateLayout title="Create Custom Collecion">
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container>
          <Grid
            item
            xs={4}
            sx={{ display: "flex", flexDirection: "column", padding: "10px" }}
          >
            <CollectionsSelect
              collections={collections}
              selectedCollection={selectedCollection}
              setSelectedCollection={setSelectedCollection}
              size={size}
              setSize={setSize}
              isReachingEnd={isReachingEnd}
              isLoadingMore={isLoadingMore}
            />
            <CollectionNFTs
              nfts={nfts}
              size={nftsSize}
              setSize={nftsSetSize}
              isReachingEnd={nftsReachingEnd}
              isLoadingMore={nftsLoadingMore}
            />
          </Grid>
          <Grid
            item
            xs={8}
            sx={{ display: "flex", flexDirection: "column", padding: "10px" }}
          >
            <Box sx={{ display: "flex", width: "100%", marginBottom: "15px" }}>
              <TextField
                id="collection-name-input"
                placeholder="Your custom collection name.."
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <Button
                onClick={onSave}
                sx={{
                  background: "#272b30",
                  marginLeft: "10px",
                  color: "white",
                  ":hover": {
                    background: "#545a61",
                  },
                  ":disabled": {
                    background: "#c7ced6",
                  },
                }}
                disabled={name.length < 2}
              >
                Save
              </Button>
            </Box>
            <CustomCollectionNFTs nfts={selectedNFTs} onRemove={onRemoveNft} />
          </Grid>
        </Grid>
      </DragDropContext>
    </CreateLayout>
  );
};

export default CreateCustomCollectionPage;
