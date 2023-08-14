import { NavigationProp, RouteProp } from "@react-navigation/native";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { useContext } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { TouchableOpacity, View } from "react-native";
import React from "react";
import { FadeInView } from "../../../components/animations/fade.animation";
import { ApartmentInfoCard } from "../../../features/apartments/components/apartment-info-card.component";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SwipeListView } from "react-native-swipe-list-view";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../infrastructure/theme";
const ApartmentList = styled(SwipeListView)`
  padding: ${(props) => props.theme.space[3]};
`;
const ApartmentItem = styled.TouchableOpacity`
  /* padding: ${(props) => props.theme.space[2]}; */
`;
const Header = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
const InfoRow = styled.View`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
const NoFavourites = styled.View`
  justify-content: center;
  text-align: center;
`;
const NoFavouritesWrapper = styled.View`
  flex: 1;
  align-items: center;
  align-self: center;
  justify-content: center;
`;
const NoFavouritesImage = styled.Image`
  width: 150px;
  height: 150px;
  align-self: center;
`;
const Title = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.latoBold};
  text-align: center;
`;
const Description = styled(Text)`
  text-align: center;
`;
const RemoveItem = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.text.primary};
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.borderRadius.large};
  margin-bottom: ${(props) => props.theme.space[3]};
`;
const RemoveIcon = styled(Ionicons)`
  align-self: flex-end;
  padding: ${(props) => props.theme.space[4]};
`;
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
                source={require("../../../../assets/add-icon.png")}
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
          renderHiddenItem={(data, rowMap) => {
            return (
              <RemoveItem onPress={() => removeFromFavourites(data.item)}>
                <RemoveIcon
                  color={theme.colors.text.inverse}
                  size={20}
                  name="trash-outline"
                ></RemoveIcon>
              </RemoveItem>
            );

          }}
          rightOpenValue={-85}
          renderItem={({ item }: { item: any }) => (
            <ApartmentItem
              onPress={() =>
                navigation.navigate("ApartmentDetail", {
                  apartment: item,
                })
              }
            >
              <ApartmentInfoCard apartment={item} />
              <Spacer position="bottom" size={"large"}></Spacer>
            </ApartmentItem>
          )}
          keyExtractor={(_, i) => `Apartment-${i}`}
        />
      )}
    </SafeArea>
  );
};
