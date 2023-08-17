import { SafeArea } from "../../../components/utility/safe-area.component";
import React from "react";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { ProfileStackNavigatorParamList } from "../../../types/profile";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { Avatar } from "react-native-paper";
import { Input } from "../../../components/input/input.component";
import { Button } from "../../../components/button/button.component";
import {
  Header,
  UserForm,
  LogoutWrapper,
} from "../components/profile-edit.styles";

type Props = NativeStackScreenProps<ProfileStackNavigatorParamList, "Profile">;
export const ProfileEditScreen = ({ navigation }: Props) => {
  return (
    <SafeArea>
      <Header>
        <IconButton onPress={() => navigation.goBack()} />
        <Text variant="title">Edit Profile</Text>
        <Spacer position="right" size="xl" />
      </Header>
      <UserForm>
        <Avatar.Image
          size={100}
          source={require("../../../../assets/avatar.jpg")}
        />
        <Spacer position="top" size="xl" />
        <Input
          disabled={true}
          defaultValue="Andrew Ilyukhin"
          iconName="person-circle-outline"
        />
        <Spacer position="top" size="large" />
        <Input
          disabled={true}
          defaultValue="+38 068-35-695-97"
          iconName="call-outline"
        />
        <Spacer position="top" size="large" />
        <Input
          disabled={true}
          defaultValue="andrey01work@gmail.com"
          iconName="mail-outline"
        />
      </UserForm>
      <LogoutWrapper>
        <Button onPress={() => null} title="Logout" />
      </LogoutWrapper>
    </SafeArea>
  );
};
