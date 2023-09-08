import { SafeArea } from "../../../components/utility/safe-area.component";
import React, { useContext } from "react";
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
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

type Props = NativeStackScreenProps<ProfileStackNavigatorParamList, "Profile">;
export const ProfileEditScreen = ({ navigation }: Props) => {
  const { user, onLogout } = useContext(AuthenticationContext);

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
          defaultValue={user.username}
          iconName="person-circle-outline"
        />
        <Spacer position="top" size="large" />
        <Input
          disabled={true}
          defaultValue="+38 077-77-777-77"
          iconName="call-outline"
        />
        <Spacer position="top" size="large" />
        <Input
          disabled={true}
          defaultValue={user.email}
          iconName="mail-outline"
        />
      </UserForm>
      <LogoutWrapper>
        <Button onPress={() => onLogout()} title="Logout" />
      </LogoutWrapper>
    </SafeArea>
  );
};
