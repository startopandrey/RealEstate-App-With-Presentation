import React, { useContext } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { FavouritesContext } from "../../services/favourites/favourites.context";
import { Apartment } from "src/types/apartments/apartment";
const FavouriteButton = styled.TouchableOpacity<{ isFavourite?: boolean; }>`
  position: absolute;
  background: ${(props)=> props.isFavourite ? props.theme.colors.bg.secondary: props.theme.colors.brand.primary };
  top: 15px;
  right: 15px;
  z-index: 9;
  padding: ${(props)=>props.theme.space[2]};
  border-radius: 50%;
`;

export const Favourite = ({ apartment  }: { apartment: Apartment }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);


  const isFavourite: boolean = !!favourites?.find(
    (r) => r.placeId === apartment.placeId
  );

  return (
    <FavouriteButton
    isFavourite={isFavourite}
      onPress={() =>
        !isFavourite
          ? addToFavourites(apartment)
          : removeFromFavourites(apartment)
      }
    >
      <AntDesign
        name={isFavourite ? "hearto" : "heart"}
        size={14}
        color={isFavourite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};
