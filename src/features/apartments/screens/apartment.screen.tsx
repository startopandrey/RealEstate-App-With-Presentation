import React, { useContext, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text as NativeText,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Avatar, Colors } from "react-native-paper";

import { FadeInView } from "../../../components/animations/fade.animation";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";

import { ApartmentsContext } from "../../../services/apartments/apartments.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import axios from "axios";
import { Search } from "../components/search.component";
import { ApartmentInfoCard } from "../components/apartment-info-card.component";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
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

import { Chip } from "../../../components/chip/chip.component";
type Props = NativeStackScreenProps<
  ApartmentStackNavigatorParamList,
  "Apartments"
>;
import {
  GreetingName,
  ListHeader,
  GreetingText,
  Greeting,
  NotificationsButton,
  HeaderEnd,
  Loading,
  CategoriesList,
  Header,
  LoadingContainer,
  LocationDropdown,
  LocationChipItem,
  AgentChipItem,
} from "../components/apartment.styles";
import { CompactApartmentCard } from "../../../components/apartment/compact-apartment-card.component";
export const ApartmentsScreen = ({ navigation }: Props) => {
  const { error: locationError } = useContext(LocationContext);
  const { isLoading, apartments, error } = useContext(ApartmentsContext);

  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const hasError = !!error || !!locationError;
  console.log(error)
  return (
    <SafeArea>
      <ScrollView>
        {isLoading && (
          <LoadingContainer>
            <Loading size={50} animating={true} color={Colors.blue300} />
          </LoadingContainer>
        )}
        <Header>
          <LocationDropdown>
            <Ionicons
              color={theme.colors.ui.primary}
              size={16}
              name="location-sharp"
            ></Ionicons>
            <Spacer position="left" size={"large"}></Spacer>
            <Text variant="body">Jakarta, Indonesia</Text>
            <Spacer position="right" size={"large"}></Spacer>
            <Ionicons
              color={theme.colors.ui.primary}
              size={16}
              name="chevron-down-outline"
            ></Ionicons>
          </LocationDropdown>
          <HeaderEnd>
            <NotificationsButton>
              <Ionicons
                color={theme.colors.ui.primary}
                size={16}
                name="notifications-outline"
              ></Ionicons>
            </NotificationsButton>
            <Spacer position="right" size={"medium"}></Spacer>
            <Avatar.Image
              size={50}
              source={require("../../../../assets/avatar.jpg")}
            />
          </HeaderEnd>
        </Header>
        <Greeting>
          <NativeText>
            <GreetingText>Hey, </GreetingText>
            <GreetingName>Andrey!</GreetingName>
          </NativeText>
          <NativeText>
            <GreetingText>Let's start exploring </GreetingText>
          </NativeText>
        </Greeting>
        <Search
          isFavouritesToggled={isToggled}
          onFavouritesToggle={() => setIsToggled(!isToggled)}
        />
        <Spacer position="left" size="large">
          <CategoriesList
            data={[
              { key: 1, category: { id: 1, name: "All" } },
              { key: 2, category: { id: 2, name: "House" } },
              { key: 3, category: { id: 3, name: "Apartment" } },
            ]}
            horizontal={true}
            renderItem={({ item }: { item: any }) => (
              <Spacer position="right" size={"medium"}>
                <Chip
                  title={item.category.name}
                  isButton={true}
                  size={"large"}
                ></Chip>
              </Spacer>
            )}
            keyExtractor={(item) => item.key}
          ></CategoriesList>
        </Spacer>
        {isToggled && (
          <FavouritesBar favourites={favourites} navigation={navigation} />
        )}
        {hasError ? (
          <Spacer position={"left"} size="large">
            <Text variant="error">
              Something went wrong retrieving the data
            </Text>
          </Spacer>
        ) : (
          <Spacer position="top" size="large">
            <ListHeader>
              <Text variant="title">Featured Estates</Text>
              <Text color={theme.colors.text.muted} variant="caption">
                view all
              </Text>
            </ListHeader>
            <ApartmentHorizontalList
              data={apartments}
              horizontal={true}
              renderItem={({ item }: { item: any }) => (
                <ApartmentHorizontalItem
                  onPress={() =>
                    navigation.navigate("ApartmentDetail", {
                      apartment: item,
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
        <Spacer position="top" size="large">
          <ListHeader>
            <Text variant="title">Top Locations</Text>
            <Text color={theme.colors.text.muted} variant="caption">
              explore
            </Text>
          </ListHeader>
          <ApartmentHorizontalList
            data={apartments}
            horizontal={true}
            renderItem={({ item }: { item: any }) => (
              <Spacer position="right" size="large">
                <LocationChipItem
                  onPress={() =>
                    navigation.navigate("ApartmentDetail", {
                      Apartment: item,
                    })
                  }
                >
                  <Avatar.Image
                    size={50}
                    source={require("../../../../assets/avatar.jpg")}
                  />
                  <Spacer position="right" size="medium"></Spacer>
                  <Text variant="body">Bali</Text>
                </LocationChipItem>
              </Spacer>
            )}
            keyExtractor={(_, i) => `Apartment-${i}`}
          />
        </Spacer>
        <Spacer position="top" size="large">
          <ListHeader>
            <Text variant="title">Top Estate Agent</Text>
            <Text color={theme.colors.text.muted} variant="caption">
              explore
            </Text>
          </ListHeader>
          <ApartmentHorizontalList
            data={apartments}
            horizontal={true}
            renderItem={({ item }: { item: any }) => (
              <Spacer position="right" size="large">
                <AgentChipItem
                  onPress={() =>
                    navigation.navigate("ApartmentDetail", {
                      Apartment: item,
                    })
                  }
                >
                  <Avatar.Image
                    size={70}
                    source={require("../../../../assets/avatar.jpg")}
                  />
                  <Spacer position="top" size="medium"></Spacer>
                  <Text variant="body">Amanda</Text>
                </AgentChipItem>
              </Spacer>
            )}
            keyExtractor={(_, i) => `Apartment-${i}`}
          />
        </Spacer>
        <Spacer position="top" size="large">
          <ListHeader>
            <Text variant="title">Explore Nearby Estates</Text>
          </ListHeader>
          <ApartmentHorizontalList
            data={apartments}
            numColumns={2}
            renderItem={({ item }: { item: any }) => (
              <CompactApartmentCard
                onPress={() => null}
                apartment={item}
              ></CompactApartmentCard>
            )}
            keyExtractor={(_, i) => `Apartment-${i}`}
          />
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
