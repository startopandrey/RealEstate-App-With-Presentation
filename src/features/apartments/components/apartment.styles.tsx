import styled from "styled-components/native";
import { ActivityIndicator, Avatar, Colors } from "react-native-paper";
export const HeaderOverlay = styled.View`
  width: 350px;
  height: 350px;
  position: absolute;
  background: ${(props) => props.theme.colors.ui.primary};
  opacity: 0.25;
  left: -80px;
  bottom: -150px;
  border-radius: 200%;
`;
export const CategoriesList = styled.FlatList``;
export const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;
export const ListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;
export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[3]};
`;
export const LocationDropdown = styled.TouchableOpacity`
  flex-direction: row;
  align-content: center;
  padding: ${(props) => props.theme.space[3]};
  align-self: flex-start;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: ${(props) => props.theme.borderRadius.large};
  border: 1px ${(props) => props.theme.colors.bg.secondary} solid;
  justify-content: space-between;
`;
export const NotificationsButton = styled.TouchableOpacity`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  align-self: flex-start;
  border-radius: ${(props) => props.theme.borderRadius.large};
  border: 1px ${(props) => props.theme.colors.bg.secondary} solid;
`;
export const HeaderEnd = styled.View`
  flex-direction: row;
`;
export const GreetingText = styled.Text`
  font-family: ${(props) => props.theme.fonts.latoRegular};
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.text.primary};
`;
export const GreetingName = styled.Text`
  font-family: ${(props) => props.theme.fonts.latoBold};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
`;
export const Greeting = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const LocationChipItem = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  background: ${(props) => props.theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.borderRadius.large};
`;
export const AgentChipItem = styled.TouchableOpacity`
  align-items: center;

  /* padding: ${(props) => props.theme.space[2]}; */
  border-radius: ${(props) => props.theme.borderRadius.large};
`;
