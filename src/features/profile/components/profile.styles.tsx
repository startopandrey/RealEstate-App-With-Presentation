import { Text } from "../../../components/typography/text.component";
import styled from "styled-components/native";

export const Header = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
export const UserInfo = styled.View`
  justify-content: center;
  align-items: center;
`;
export const TextLowercase = styled(Text)`
  text-transform: lowercase;
`;
export const AvatarPhoto = styled.Image``;
export const ActivityInfo = styled.View`
  padding: ${(props) => props.theme.space[3]};
  flex-direction: row;
  justify-content: space-between;
`;
export const ActivityInfoCard = styled.View`
  border: 1px ${(props) => props.theme.colors.bg.secondary};
  border-radius: ${(props) => props.theme.borderRadius.large};
  /* height: ${(props) => props.theme.space[5]}; */
  flex: 1;
  margin: ${(props) => props.theme.space[1]};
  justify-content: center;
  align-items: center;
`;
export const TabsBarWrapper = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const ListingWrapper = styled.View``;
export const ListingHeader = styled.View``;
export const SectionCategories = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
`;
