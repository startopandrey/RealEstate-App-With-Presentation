import React, { useContext, useState } from "react";
import {
  Text as NativeText,
  ScrollView as ScrollViewNative,
} from "react-native";
import { Avatar as AvatarPaper } from "react-native-paper";

import { FadeInView } from "../../../components/animations/fade.animation";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";

import { ApartmentsContext } from "../../../services/apartments/apartments.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { Search } from "../components/search.component";
import { ApartmentInfoCard } from "../components/apartment-info-card.component";
import { Ionicons } from "@expo/vector-icons";
import {
  ApartmentHorizontalList,
  ApartmentHorizontalItem,
} from "../components/apartment-list.styles";
import { LocationContext } from "../../../services/location/location.context";
import { Text } from "../../../components/typography/text.component";

import { ApartmentStackNavigatorParamList } from "src/types/apartments";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { theme } from "../../../infrastructure/theme";
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
import { CompactApartmentCard } from "../../../components/apartment/compact-apartment-card.component";
import { Loading } from "../../../components/loading/loading.component";
import { mockApartments, topAreasMock } from "../../../../mockData";
import { CategoryRow } from "../../../components/category-row/category-row.component";
import { Avatar } from "../../../components/avatar/ avatar.component";
type Props = NativeStackScreenProps<
  ApartmentStackNavigatorParamList,
  "Apartments"
>;
export const ApartmentsScreen = ({ navigation }: Props) => {
  const { error: locationError, userLocation } = useContext(LocationContext);
  const { isLoading, apartments, error } = useContext(ApartmentsContext);
  console.log(userLocation);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [userAddress, setUserAddress] = useState("");
  const hasError = !!error || !!locationError || !apartments.length;

  return (
    <SafeArea>
      <ScrollViewNative nestedScrollEnabled={true}>
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
            <Avatar
              size={50}
              url={
                "https://media.licdn.com/dms/image/D4D35AQH-qG72qjC0hA/profile-framedphoto-shrink_400_400/0/1691073703367?e=1695222000&v=beta&t=61RHxwYF4KAd91DD1EEjHfliBMoyWPcKfd2RLeV8_4A"
              }
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
                keyExtractor={(item, i) => `Apartment-${item?._id}`}
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
                    <LocationChipItem onPress={() => console.log("hhii")}>
                      <Avatar size={50} url={item.photoUrl} />
                      <Spacer position="right" size="medium" />
                      <Text variant="body">{item.areaName}</Text>
                    </LocationChipItem>
                  </Spacer>
                );
              }}
              keyExtractor={(_, i) => `Apartment-${i.id}`}
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
              data={[
                {
                  agentName: "Anderea",
                  photoUrl:
                    "https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/1152002039RealEstateBroker.jpg",
                },
                {
                  agentName: "Aaron",
                  photoUrl:
                    "https://www.themanual.com/wp-content/uploads/sites/9/2017/07/aaron-kirman.jpg?fit=800%2C800&p=1",
                },
                {
                  agentName: "Michael",
                  photoUrl:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIsLl_2a68ulkk-voH_jG_wNMlf7HTqEIXGC4N4LWuWzmuKeVE8Osr9f-NiW7WzjTqrRk&usqp=CAU",
                },
                {
                  agentName: "Hairry",
                  photoUrl:
                    "https://getgoodhead.com/wp-content/uploads/2018/04/Jake-Roth-Best-Hair.jpg",
                },
              ]}
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
                    <Avatar size={70} url={item.photoUrl} />
                    <Spacer position="top" size="medium" />
                    <Text variant="body">{item.agentName}</Text>
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
            <Spacer position="top" size="large" />
            <ApartmentHorizontalList
              data={apartments}
              numColumns={2}
              renderItem={({ item }: { item: any }) => (
                <CompactApartmentCard
                  onPress={() =>
                    navigation.navigate("ApartmentDetail", { apartment: item })
                  }
                  apartment={item}
                />
              )}
              keyExtractor={(_, i) => `Apartment-${i}`}
            />
          </Spacer>
        </ScrollView>
      </ScrollViewNative>
      <Loading isOpen={isLoading}></Loading>
    </SafeArea>
  );
};
