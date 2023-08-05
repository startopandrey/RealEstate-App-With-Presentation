import React, { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";

import { FadeInView } from "../../../components/animations/fade.animation";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";

import { ApartmentsContext } from "../../../services/apartments/apartments.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import axios from "axios";
import { Search } from "../components/search.component";
import { ApartmentInfoCard } from "../components/apartment-info-card.component";

import {
  ApartmentHorizontalList,
  ApartmentHorizontalItem,
} from "../components/apartment-list.styles";
import { LocationContext } from "../../../services/location/location.context";
import { Text } from "../../../components/typography/text.component";
import { v4 as uuidv4 } from "uuid";
import {
  Apartment,
  Apartment as ApartmentType,
} from "src/types/apartments/Apartment";
import {
  NavigationAction,
  NavigationProp,
  NavigationState,
} from "@react-navigation/native";

import { ApartmentStackNavigatorParamList } from "src/types/apartments";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { theme } from "../../../infrastructure/theme";
type Props = NativeStackScreenProps<
  ApartmentStackNavigatorParamList,
  "Apartments"
>;
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;
const ListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

export const ApartmentsScreen = ({ navigation }: Props) => {
  const { error: locationError } = useContext(LocationContext);
  const { isLoading, apartments, error } = useContext(ApartmentsContext);

  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const hasError = !!error || !!locationError;
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
 <Spacer><CategoriesList></CategoriesList></Spacer>
      {isToggled && (
        <FavouritesBar favourites={favourites} navigation={navigation} />
      )}
      {hasError ? (
        <Spacer position={"left"} size="large">
          <Text variant="error">Something went wrong retrieving the data</Text>
        </Spacer>
      ) : (
        <Spacer>
          <ListHeader>
            <Text variant="title">Featured Estates</Text>
            <Text color={theme.colors.text.muted} variant="caption">view all</Text>
          </ListHeader>
          <ApartmentHorizontalList
            data={apartments}
            horizontal={true}
            renderItem={({ item }: { item: any }) => (
              <ApartmentHorizontalItem
                onPress={() =>
                  navigation.navigate("ApartmentDetail", {
                    Apartment: item,
                  })
                }
              >
                <Spacer position="right" size="large">
                  <FadeInView>
                    <ApartmentInfoCard apartment={item} />
                  </FadeInView>
                </Spacer>
              </ApartmentHorizontalItem>
            )}
            keyExtractor={(_, i) => `Apartment-${i}`}
          />
        </Spacer>
      )}
    </SafeArea>
  );
};
