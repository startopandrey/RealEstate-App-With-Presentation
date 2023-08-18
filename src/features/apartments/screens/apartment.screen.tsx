import React, { useContext, useState } from "react";
import {
  Text as NativeText,
  ScrollView as ScrollViewNative,
} from "react-native";
import { Avatar, Colors } from "react-native-paper";

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
import { Chip } from "../../../components/chip/chip.component";

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
  HeaderOverlay,
} from "../components/apartment.styles";
import { CompactApartmentCard } from "../../../components/apartment/compact-apartment-card.component";
type Props = NativeStackScreenProps<
  ApartmentStackNavigatorParamList,
  "Apartments"
>;
export const ApartmentsScreen = ({ navigation }: Props) => {
  const { error: locationError } = useContext(LocationContext);
  const { isLoading, apartments, error } = useContext(ApartmentsContext);

  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const hasError = !!error || !!locationError;

  return (
    <SafeArea>
      <ScrollViewNative nestedScrollEnabled={true}>
        {isLoading && (
          <LoadingContainer>
            <Loading size={50} animating={true} color={Colors.blue300} />
          </LoadingContainer>
        )}
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
                  isSelected={item.category.name === "All"}
                  title={item.category.name}
                  isButton={true}
                  size={"large"}
                />
              </Spacer>
            )}
            keyExtractor={(item: any) => item?.key}
          />
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
          <ScrollViewNative nestedScrollEnabled={true}>
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
                keyExtractor={(item, i) => `Apartment-${item.title}`}
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
              data={[
                {
                  locationName: "Bali",
                  photo:
                    "https://balidave.com/wp-content/uploads/2022/11/best-hotel-bali.jpeg",
                },
                {
                  locationName: "Vinnitysa",
                  photo:
                    "https://toget.education/wp-content/uploads/2016/02/vinnitsa4-300x210.png",
                },
                {
                  locationName: "Florence",
                  photo:
                    "https://media.timeout.com/images/105879414/750/422/image.jpg",
                },
              ]}
              horizontal={true}
              renderItem={({ item }: { item: any }) => (
                <Spacer position="right" size="large">
                  <LocationChipItem onPress={() => console.log("hhii")}>
                    <Avatar.Image size={50} source={{ uri: item.photo }} />
                    <Spacer position="right" size="medium" />
                    <Text variant="body">{item.locationName}</Text>
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
              data={[
                {
                  agentName: "Anderea",
                  photo:
                    "https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/1152002039RealEstateBroker.jpg",
                },
                {
                  agentName: "Aaron",
                  photo:
                    "https://www.themanual.com/wp-content/uploads/sites/9/2017/07/aaron-kirman.jpg?fit=800%2C800&p=1",
                },
                {
                  agentName: "Michael",
                  photo:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIsLl_2a68ulkk-voH_jG_wNMlf7HTqEIXGC4N4LWuWzmuKeVE8Osr9f-NiW7WzjTqrRk&usqp=CAU",
                },
                {
                  agentName: "Hairry",
                  photo:
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
                    <Avatar.Image size={70} source={{ uri: item.photo }} />
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
    </SafeArea>
  );
};
