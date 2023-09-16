import React, { useContext, useRef, useState } from "react";
import {
  Text as NativeText,
  ScrollView as ScrollViewNative,
  TouchableOpacity,
} from "react-native";
import { Avatar as AvatarPaper } from "react-native-paper";

import { FadeInView } from "@src/components/animations/fade.animation";
import { SafeArea } from "@src/components/utility/safe-area.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { FavouritesBar } from "@src/components/favourites/favourites-bar.component";

import { ApartmentsContext } from "@src/services/apartments/apartments.context";
import { FavouritesContext } from "@src/services/favourites/favourites.context";
import { Search } from "../components/search.component";
import { ApartmentInfoCard } from "../components/apartment-info-card.component";
import { Ionicons } from "@expo/vector-icons";
import {
  ApartmentHorizontalList,
  ApartmentHorizontalItem,
} from "../components/apartment-list.styles";
import { LocationContext } from "@src/services/location/location.context";
import { Text } from "@src/components/typography/text.component";

import { ApartmentStackNavigatorParamList } from "src/types/apartments";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { theme } from "@src/infrastructure/theme";
import { ScrollView } from "react-native-virtualized-view";

import {
  GreetingName,
  ListHeader,
  GreetingText,
  Greeting,
  NotificationsButton,
  HeaderEnd,
  Header,
  LocationDropdown,
  LocationChipItem,
  AgentChipItem,
  HeaderOverlay,
  ErrorWrapper,
} from "../components/apartment.styles";
import { CompactApartmentCard } from "@src/components/apartment/compact-apartment-card.component";
import { Loading } from "@src/components/loading/loading.component";
import { agentsMock, mockApartments, topAreasMock } from "@src/../mockData";
import { CategoryRow } from "@src/components/category-row/category-row.component";
import { Avatar } from "@src/components/avatar/avatar.component";
import { Linking } from "react-native";
import { generateKey } from "@src/services/helpers/index.helper";
type Props = NativeStackScreenProps<
  ApartmentStackNavigatorParamList,
  "Apartments"
>;
export const ApartmentsScreen = ({ navigation }: Props) => {
  const {
    error: locationError,
    userLocation,
    search,
  } = useContext(LocationContext);
  const { isLoading, apartments, error } = useContext(ApartmentsContext);
  console.log(userLocation);
  const mainRef = useRef<ScrollViewNative>(null);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [userAddress, setUserAddress] = useState("");
  const hasError = !!error || !!locationError || !apartments.length;
  const scrollToTop = () => {
    mainRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  return (
    <SafeArea>
      <ScrollViewNative ref={mainRef} nestedScrollEnabled={true}>
        <Header>
          <HeaderOverlay />
          <LocationDropdown>
            <Ionicons
              color={theme.colors.ui.primary}
              size={16}
              name="location-sharp"
            />
            <Spacer position="left" size={"large"} />
            <Text variant="body">Vinnitysa, Ukraine</Text>
            <Spacer position="right" size={"large"} />
            <Ionicons
              color={theme.colors.ui.primary}
              size={16}
              name="chevron-down-outline"
            />
          </LocationDropdown>
          <HeaderEnd>
            <NotificationsButton>
              <Ionicons
                color={theme.colors.ui.primary}
                size={16}
                name="notifications-outline"
              />
            </NotificationsButton>
            <Spacer position="right" size={"medium"} />
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Avatar size={50} isUsername={true} />
            </TouchableOpacity>
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
        <Search />
        <Spacer position="left" size="large">
          <CategoryRow></CategoryRow>
        </Spacer>
        {isToggled && (
          <FavouritesBar favourites={favourites} navigation={navigation} />
        )}
        {!isLoading && !apartments.length ? (
          <ErrorWrapper>
            <Text variant="error">No apartments found.</Text>
          </ErrorWrapper>
        ) : (
          <ScrollViewNative nestedScrollEnabled={true}>
            <Spacer position="top" size="large">
              <ListHeader>
                <Text variant="title">Featured Estates</Text>
                <Text color={theme.colors.text.muted} variant="caption">
                  view all
                </Text>
              </ListHeader>

              <ApartmentHorizontalList
                data={!isLoading ? apartments : mockApartments}
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
                        <ApartmentInfoCard
                          isLoading={isLoading}
                          apartment={item}
                        />
                      </FadeInView>
                    </Spacer>
                  </ApartmentHorizontalItem>
                )}
                keyExtractor={(item, i) => item._id}
              />
            </Spacer>
          </ScrollViewNative>
        )}
        <ScrollView>
          <Spacer position="top" size="large">
            <ListHeader>
              <Text variant="title">Top Locations</Text>
              <Text color={theme.colors.text.muted} variant="caption">
                explore
              </Text>
            </ListHeader>
            <ApartmentHorizontalList
              data={topAreasMock}
              horizontal={true}
              renderItem={({ item }) => {
                return (
                  <Spacer position="right" size="large">
                    <LocationChipItem
                      onPress={() => {
                        search(item.areaName);
                        scrollToTop();
                      }}
                    >
                      <Avatar size={50} url={item.photoUrl} />
                      <Spacer position="right" size="medium" />
                      <Text variant="body">{item.areaName}</Text>
                    </LocationChipItem>
                  </Spacer>
                );
              }}
              keyExtractor={(item, i) => item?.areaName}
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
              data={agentsMock}
              horizontal={true}
              renderItem={({ item }: { item: any }) => (
                <Spacer position="right" size="large">
                  <AgentChipItem
                    onPress={() => Linking.openURL("tel:+380673569597")}
                  >
                    <Avatar
                      size={70}
                      name={item?.agentName}
                      url={item.photoUrl}
                    />
                    <Spacer position="top" size="medium" />
                    <Text variant="body">{item.agentName}</Text>
                  </AgentChipItem>
                </Spacer>
              )}
              keyExtractor={(item, i) => item?.agentName}
            />
          </Spacer>
          <Spacer position="top" size="large">
            <ListHeader>
              <Text variant="title">Explore Nearby Estates</Text>
            </ListHeader>
            <Spacer position="top" size="large" />
            {!isLoading && !apartments.length ? (
              <ErrorWrapper>
                <Text variant="error">No apartments found.</Text>
              </ErrorWrapper>
            ) : (
              <ApartmentHorizontalList
                data={apartments}
                numColumns={2}
                renderItem={({ item }: { item: any }) => (
                  <CompactApartmentCard
                    onPress={() =>
                      navigation.navigate("ApartmentDetail", {
                        apartment: item,
                      })
                    }
                    apartment={item}
                  />
                )}
                keyExtractor={(item, i) => item._id}
              />
            )}
          </Spacer>
        </ScrollView>
      </ScrollViewNative>
      <Loading isOpen={isLoading}></Loading>
    </SafeArea>
  );
};
