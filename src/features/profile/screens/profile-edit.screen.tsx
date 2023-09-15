import { SafeArea } from "../../../components/utility/safe-area.component";
import React, { useContext } from "react";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { ProfileStackNavigatorParamList } from "../../../types/profile";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { Input } from "../../../components/input/input.component";
import { Button } from "../../../components/button/button.component";
import {
  Header,
  UserForm,
  LogoutWrapper,
  TextLowercase,
} from "../components/profile-edit.styles";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Avatar } from "../../../components/avatar/avatar.component";

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
        <Avatar
          size={100}
          url={
            "https://media.licdn.com/dms/image/D4D35AQH-qG72qjC0hA/profile-framedphoto-shrink_400_400/0/1691073703367?e=1695301200&v=beta&t=xKzsk5UOvS_xZGyclP-ul08i8YOtdW7YuUhr7f1WGxM"
          }
        />
        <Spacer position="top" size="xl" />
        <Text variant="title">{user.username}</Text>
        <Spacer position="top" size="large" />
        <Text variant="subtitle">{"+38 077-77-777-77"}</Text>

        <Spacer position="top" size="large" />
        <TextLowercase variant="body">{user.email}</TextLowercase>
      </UserForm>
      <LogoutWrapper>
        <Button onPress={() => onLogout()} title="Logout" />
      </LogoutWrapper>
    </SafeArea>
  );
};
