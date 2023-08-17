import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
export const Dot = styled.View<{ focused: boolean }>`
  background: ${(props) =>
    props.focused ? props.theme.colors.ui.primary : "transparent"};
  position: absolute;
  top: 40px;
  width: 8px;
  border-radius: 50%;
  height: 8px;
`;
export const TabIconWrapper = styled.View`
  padding-top: ${(props) => props.theme.space[2]};
  justify-content: center;
  align-items: center;
`;
export const PostIconWrapper = styled.View`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.brand.primary};
`;
export const CustomBlurView = styled(BlurView)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
export const CustomBottomTabBar = styled(BottomTabBar)`
  background-color: transparent;
  height: 80px;
`;
