import { NavigationProp, RouteProp } from "@react-navigation/native";
import { FavouritesContext } from "@src/services/favourites/favourites.context";
import { useContext } from "react";
import { SafeArea } from "@src/components/utility/safe-area.component";

import { Spacer } from "@src/components/spacer/spacer.component";
import { Text } from "@src/components/typography/text.component";
import { ListRenderItemInfo, TouchableOpacity } from "react-native";
import React from "react";
import { ApartmentInfoCard } from "@src/features/apartments/components/apartment-info-card.component";
import { IconButton } from "@src/components/icon-button/icon-button.component";
import { AuthenticationContext } from "@src/services/authentication/authentication.context";
import { theme } from "@src/infrastructure/theme";
import {
  Header,
  InfoRow,
  NoFavouritesWrapper,
  NoFavourites,
  NoFavouritesImage,
  Title,
  Description,
  ApartmentList,
  RemoveItem,
  RemoveIcon,
} from "../components/favourites.styles";
import { Apartment } from "@src/types/apartments/apartment";

export const FavouritesScreen = ({
  navigation,
}: {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}) => {
  const { favourites, removeAllFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const { user } = useContext(AuthenticationContext);

  const userId: string = user?.uid!;
  return (
    <SafeArea>
      <Header>
        <Spacer position="right" size="xxl" />
        <Text variant="title">My favorite</Text>
        <IconButton
          onPress={() => removeAllFavourites(userId)}
          iconName="trash-outline"
        />
      </Header>
      <InfoRow>
        <Text variant="title">{favourites.length} estates</Text>
      </InfoRow>
      {!favourites.length ? (
        <NoFavouritesWrapper>
          <NoFavourites>
            <TouchableOpacity onPress={() => navigation.navigate("Apartments")}>
              <NoFavouritesImage
                source={require("@src/../assets/add-icon.png")}
              />
            </TouchableOpacity>
            <Spacer position="top" size={"large"} />
            <Title variant="title">Your favorite page is empty</Title>
            <Spacer position="top" size={"large"} />
            <Description variant="body">
              Click add button above to start exploring and choose your favorite
              estates.
            </Description>
            <Spacer position="bottom" size={"xxl"} />
          </NoFavourites>
        </NoFavouritesWrapper>
      ) : (
        <ApartmentList
          data={favourites}
          renderHiddenItem={(data: ListRenderItemInfo<Apartment>) => {
            return (
              <RemoveItem onPress={() => removeFromFavourites(data.item)}>
                <RemoveIcon
                  color={theme.colors.text.inverse}
                  size={20}
                  name="trash-outline"
                />
              </RemoveItem>
            );
          }}
          rightOpenValue={-85}
          renderItem={({ item }: { item: any }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ApartmentDetail", {
                  apartment: item,
                })
              }
            >
              <ApartmentInfoCard apartment={item} />
              <Spacer position="bottom" size={"large"} />
            </TouchableOpacity>
          )}
          keyExtractor={(_, i) => `Apartment-${i}`}
        />
      )}
    </SafeArea>
  );
};
