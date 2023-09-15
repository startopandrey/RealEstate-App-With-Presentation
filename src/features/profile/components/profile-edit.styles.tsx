import { Text } from "../../../components/typography/text.component";
import styled from "styled-components/native";

export const Header = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
export const UserForm = styled.View`
  padding: ${(props) => props.theme.space[3]};
  justify-content: center;
  align-items: center;
`;
export const LogoutWrapper = styled.View`
flex: 1;
  justify-content: flex-end;
  padding: ${(props) => props.theme.space[3]};
`;
export const TextLowercase = styled(Text)`
  text-transform: lowercase;
`;