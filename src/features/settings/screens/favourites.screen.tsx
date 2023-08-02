import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

import { FavouritesContext } from "../../../services/favourites/favourites.context";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { RestaurantList } from "../../restaurants/components/restaurant-list.styles";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;
import { SettingsStackNavigatorParamList } from "src/types/settings";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Restaurant } from "src/types/restaurants/restaurant";
type Props = NativeStackScreenProps<
  SettingsStackNavigatorParamList,
  "Favourites"
>;
export const FavouritesScreen = ({ navigation }: Props) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites?.length ? (
    <SafeArea>
      <RestaurantList
        data={favourites}
        renderItem={({ item }: {item: Restaurant}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item: Restaurant) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text center>No favourites yet</Text>
    </NoFavouritesArea>
  );
};
