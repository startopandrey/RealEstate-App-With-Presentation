import { Text } from "@src/components/typography/text.component";
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

  height: 50px;
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;
export const TextLowercase = styled(Text)`
  text-transform: lowercase;
`;
