import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";

export const SafeArea = styled(SafeAreaView)<{
  transparent?: boolean;
  isBottomHidden?: boolean;
}>`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: ${(props) =>
    props.transparent ? "transparent" : props.theme.colors.bg.primary};
  margin-bottom: ${(props) => (props.isBottomHidden ? "0px" : "80px")};
`;
