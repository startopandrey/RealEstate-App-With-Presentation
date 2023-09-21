import { SafeArea } from "@src/components/utility/safe-area.component";
import React, { useContext } from "react";
import { IconButton } from "@src/components/icon-button/icon-button.component";
import { ProfileStackNavigatorParamList } from "@src/types/profile";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Spacer } from "@src/components/spacer/spacer.component";
import { Text } from "@src/components/typography/text.component";

import { Input } from "@src/components/input/input.component";
import { Button } from "@src/components/button/button.component";
import {
  Header,
  UserForm,
  LogoutWrapper,
  TextLowercase,
} from "../components/profile-edit.styles";
import { AuthenticationContext } from "@src/services/authentication/authentication.context";
import { Avatar } from "@src/components/avatar/avatar.component";

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
        <Avatar size={100} isUsername={true} />
        <Spacer position="top" size="xl" />
        <Text variant="title">{user.username}</Text>
        <Spacer position="top" size="large" />
        <Text variant="subtitle">{"+38 077-77-777-77"}</Text>

        <Spacer position="top" size="large" />
        <TextLowercase variant="body">{user.email}</TextLowercase>
      </UserForm>
      <LogoutWrapper>
        <Button isFullWidth={true} onPress={() => onLogout()} title="Logout" />
      </LogoutWrapper>
    </SafeArea>
  );
};
