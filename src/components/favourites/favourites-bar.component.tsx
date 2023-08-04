import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Spacer } from "../spacer/spacer.component";
import { CompactApartmentInfo } from "../apartment/compact-apartment-info.component";
import { Text } from "../typography/text.component";
import { Card } from "react-native-paper";
import { Apartment } from "src/types/apartments/apartment";

const FavouritesWrapper = styled(Card)`
  padding: 10px;
  z-index: 999;
  border-radius: ${(props) => props.theme.space[3]};
`;
export const FavouritesBar = ({ favourites, navigation }: { favourites: Apartment[], navigation: any}) => {
  if (!favourites.length) {
    return null;
  }
  return (
    <FavouritesWrapper elevation={3}>
      <Spacer position={"left"} size={"large"}>
        <Text variant="caption">Favourites</Text>
      </Spacer>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((apartment: Apartment) => {
          const key = apartment.name;
          return (
            <Spacer key={key} position="left" size="medium">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ApartmentDetail", {
                    apartment,
                  })
                }
              >
                <CompactApartmentInfo apartment={apartment} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavouritesWrapper>
  );
};
