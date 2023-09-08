import React, { useContext } from "react";
import styled from "styled-components/native";

import { List, Avatar } from "react-native-paper";
import { ViewProps } from 'react-native';
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { colors } from "../../../infrastructure/theme/colors";
import ListItemProps from "react-native-paper/lib/typescript/components/List/ListItem";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background: rgba(255, 255, 255, 0.5);
`;
const AvatarContainer = styled.View`
  align-items: center;
`;
const SettingsBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const TransperantSafeArea = styled(SafeArea)`
  background-color: transparent;
`;
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingsStackNavigatorParamList } from "src/types/settings";
import { nativeViewProps } from "react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler";
type Props = NativeStackScreenProps<
  SettingsStackNavigatorParamList,
  "Settings"
>;
export const SettingsScreen = ({ navigation }: Props) => {
  const { user } = useContext(AuthenticationContext);
  return (
    <SettingsBackground>
      <TransperantSafeArea>
        <AvatarContainer>
          <Avatar.Iconz
            size={180}
            icon="human"
            style={{backgroundColor: colors.brand.primary}}
         
          />
          <Spacer position="top" size="large">
            <Text variant="label">{user?.email}</Text>
          </Spacer>
        </AvatarContainer>

        <List.Section>
          <SettingsItem
            title="Favourites"
            description="View your favourites"
            left={(props) => (
              <List.Icon {...props} color={colors.ui.error} icon="heart" />
            )}
            onPress={() => navigation.navigate("Favourites")}
          />
          <Spacer></Spacer>
          <SettingsItem
            title="Payment"
            left={(props) => (
              <List.Icon {...props} color={colors.ui.secondary} icon="cash" />
            )}
            onPress={() => null}
          />
          <Spacer></Spacer>
          <SettingsItem
            title="Past Orders"
            left={(props) => (
              <List.Icon
                {...props}
                color={colors.ui.secondary}
                icon="history"
              />
            )}
            onPress={() => null}
          />
          <Spacer></Spacer>
          <SettingsItem
            title="Logout"
            left={(props) => (
              <List.Icon {...props} color={colors.ui.secondary} icon="door" />
            )}
            onPress={()=> onLogout()}
          />
        </List.Section>
      </TransperantSafeArea>
    </SettingsBackground>
  );
};
