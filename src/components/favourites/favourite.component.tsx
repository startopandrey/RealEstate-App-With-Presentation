import React, { useContext } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { FavouritesContext } from "../../services/favourites/favourites.context";
import { Apartment } from "src/types/apartments/apartment";
const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favourite = ({ apartment  }: { apartment: Apartment }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);


  const isFavourite: boolean = !!favourites?.find(
    (r) => r.placeId === apartment.placeId
  );

  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite
          ? addToFavourites(apartment)
          : removeFromFavourites(apartment)
      }
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={24}
        color={isFavourite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};
