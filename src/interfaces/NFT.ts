export interface NFT {
  tokenId: string;
  name: string;
  image: string;
  rarity: number;
  rarityRank: number;
  collection: OriginalCollection;
  owner: string;
}

export interface OriginalCollection {
  id: string;
  name: string;
}
