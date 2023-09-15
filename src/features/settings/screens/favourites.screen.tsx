import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

import { FavouritesContext } from "@src/services/favourites/favourites.context";

import { SafeArea } from "@src/components/utility/safe-area.component";
import { Text } from "@src/components/typography/text.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { v4 as uuidv4 } from "uuid";
import { ApartmentList } from "../../apartments/components/apartment-list.styles";
import { ApartmentInfoCard } from "../../apartments/components/apartment-info-card.component";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;
import { SettingsStackNavigatorParamList } from "src/types/settings";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Apartment } from "src/types/apartments/apartment";
type Props = NativeStackScreenProps<
  SettingsStackNavigatorParamList,
  "Favourites"
>;
export const FavouritesScreen = ({ navigation }: Props) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites?.length ? (
    <SafeArea>
      <ApartmentList
        data={favourites}
        renderItem={({ item }: { item: any }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ApartmentDetail", {
                apartment: item,
              })
            }
          >
            <Spacer position="bottom" size="large">
              <ApartmentInfoCard apartment={item} />
            </Spacer>
          </TouchableOpacity>
        )}
        keyExtractor={() => `${uuidv4()}`}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text variant="body">No favourites yet</Text>
    </NoFavouritesArea>
  );
};
