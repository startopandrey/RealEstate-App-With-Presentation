import { ScrollView, View } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { Avatar } from "react-native-paper";
import { useContext, useState } from "react";
import React from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { TabsBar } from "../../../components/tabs-bar/tabs-bar.component";

import { ApartmentsContext } from "../../../services/apartments/apartments.context";
import { FlatList } from "react-native";
import { CompactApartmentCard } from "../../../components/apartment/compact-apartment-card.component";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackNavigatorParamList } from "../../../types/profile";
const Header = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
const UserInfo = styled.View`
  justify-content: center;
  align-items: center;
`;
const TextLowercase = styled(Text)`
  text-transform: lowercase;
`;
const AvatarPhoto = styled.Image``;
const ActivityInfo = styled.View`
  padding: ${(props) => props.theme.space[3]};
  flex-direction: row;
  justify-content: space-between;
`;
const ActivityInfoCard = styled.View`
  border: 1px ${(props) => props.theme.colors.bg.secondary};
  border-radius: ${(props) => props.theme.borderRadius.large};
  /* height: ${(props) => props.theme.space[5]}; */
  flex: 1;
  margin: ${(props) => props.theme.space[1]};
  justify-content: center;
  align-items: center;
`;
const TabsBarWrapper = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
const ListingWrapper = styled.View``;
const ListingHeader = styled.View``;
const SectionCategories = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
`;
type Props = NativeStackScreenProps<ProfileStackNavigatorParamList, "Profile">;
export const ProfileScreen = ({ navigation, route }: Props) => {
  const { user } = useContext(AuthenticationContext);
  const { apartments } = useContext(ApartmentsContext);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const renderListingSection = () => {
    return (
      <ListingWrapper>
        <ListingHeader>
          <Text variant="title">{apartments.length} Listings</Text>
        </ListingHeader>
        <Spacer position="top" size="large"></Spacer>
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
          <IconButton onPress={() => null} iconName="settings-outline" />
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
