import React, { useContext } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

import { FavouritesContext } from "../../services/favourites/favourites.context";
import { Apartment } from "src/types/apartments/apartment";
const FavouriteButton = styled.TouchableOpacity<{
  isFavourite?: boolean;
  size: "small" | "medium";
}>`
  position: absolute;
  background: ${(props) =>
    props.isFavourite
      ? props.theme.colors.bg.secondary
      : props.theme.colors.brand.primary};
  top: ${(props) => (props.size === "small" ? "10px" : "0px")};
  right: ${(props) => (props.size === "small" ? "10px" : "0px")};
  z-index: 9;
  padding: ${(props) => props.theme.space[props.size === "small" ? 2 : 3]};
  border-radius: 50%;
`;

export const Favourite = ({
  apartment,
  size = "small",
}: {
  apartment: NewApartment;
  size?: "small" | "medium";
}) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  const isFavourite: boolean = !!favourites?.find(
    (r) => r._id === apartment._id
  );

  return (
    <FavouriteButton
      isFavourite={!isFavourite}
      size={size}
      onPress={() =>
        !isFavourite
          ? addToFavourites(apartment)
          : removeFromFavourites(apartment)
      }
    >
      <AntDesign
        name={!isFavourite ? "hearto" : "heart"}
        size={size === "small" ? 14 : 20}
        color={!isFavourite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};
