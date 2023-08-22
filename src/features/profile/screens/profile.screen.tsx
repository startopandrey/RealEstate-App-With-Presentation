import { ScrollView } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { Avatar } from "react-native-paper";
import { useContext, useState } from "react";
import React from "react";
import { TabsBar } from "../../../components/tabs-bar/tabs-bar.component";

import { ApartmentsContext } from "../../../services/apartments/apartments.context";
import { FlatList } from "react-native";
import { CompactApartmentCard } from "../../../components/apartment/compact-apartment-card.component";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackNavigatorParamList } from "../../../types/profile";
import {
  Header,
  ListingHeader,
  ListingWrapper,
  UserInfo,
  TextLowercase,
  ActivityInfo,
  ActivityInfoCard,
  TabsBarWrapper,
  SectionCategories,
} from "../components/profile.styles";

type Props = NativeStackScreenProps<ProfileStackNavigatorParamList, "Profile">;
export const ProfileScreen = ({ navigation }: Props): React.JSX.Element => {
  // const { user } = useContext(AuthenticationContext);
  const { apartments } = useContext(ApartmentsContext);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const renderListingSection = () => {
    return (
      <ListingWrapper>
        <ListingHeader>
          <Text variant="title">{apartments.length} Listings</Text>
        </ListingHeader>
        <Spacer position="top" size="large" />
        <FlatList
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
      </ListingWrapper>
    );
  };
  return (
    <SafeArea>
      <ScrollView>
        <Header>
          <Spacer position="right" size="xl" />
          <Text variant="title">Profile</Text>
          <IconButton
            onPress={() => navigation.navigate("ProfileEdit")}
            iconName="settings-outline"
          />
        </Header>
        <UserInfo>
          <Avatar.Image
            size={90}
            source={require("../../../../assets/avatar.jpg")}
          />
          <Spacer position="top" size="large" />
          <Text variant="title">{"Andrew Ilyukhin"}</Text>
          <Spacer position="top" size="small" />
          <TextLowercase variant="body">
            {"andrey01work@gmail.com"}
          </TextLowercase>
        </UserInfo>
        <ActivityInfo>
          {[
            { quantity: 30, name: "Listings" },
            { quantity: 12, name: "Sold" },
            { quantity: 28, name: "Reviews" },
          ].map((el) => (
            <ActivityInfoCard>
              <Spacer position="top" size="large" />
              <Text variant="title">{el.quantity}</Text>
              <Spacer position="top" size="medium" />
              <Text variant="body">{el.name}</Text>
              <Spacer position="top" size="large" />
            </ActivityInfoCard>
          ))}
        </ActivityInfo>
        <TabsBarWrapper>
          <TabsBar
            selectedIndex={selectedTabIndex}
            setSelectedIndex={setSelectedTabIndex}
            tabs={[
              { id: "1", name: "Transaction" },
              { id: "2", name: "Listings" },
              { id: "3", name: "Sold" },
            ]}
          />
        </TabsBarWrapper>
        <SectionCategories>{renderListingSection()}</SectionCategories>
      </ScrollView>
    </SafeArea>
  );
};
