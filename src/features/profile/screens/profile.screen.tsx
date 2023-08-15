import { View } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import styled from "styled-components/native";
const Header = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
export const ProfileScreen = () => {
  return (
    <SafeArea>
      
      <Header>
        <Spacer position="right" size="xxl" />
        <Text variant="title">My favorite</Text>
        <IconButton
          onPress={() => removeAllFavourites(userId)}
          iconName="trash-outline"
        />
      </Header>
    </SafeArea>
  );
};
