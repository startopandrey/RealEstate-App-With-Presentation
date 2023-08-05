import styled from "styled-components/native";
import { Text } from "../typography/text.component";

const ChipView = styled.TouchableOpacity<{
  size: "medium" | "large";
  isSelected: boolean;
  disabled: boolean;
  title: string;
}>`
  border-radius: ${(props) => props.theme.borderRadius.small};
  background: ${(props) =>
    !props.isSelected
      ? props.theme.colors.ui.primary
      : props.theme.colors.bg.secondary};
  align-self: center;

  padding: ${(props) => props.theme.space[2]};
`;
const ChipText = styled(Text)<{ isSelected: boolean }>`
  color: ${(props) =>
    !props.isSelected
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.primary};
`;
export const Chip = ({
  size,

  isButton,
  title,
  onPress,
}: {
  size: "medium" | "large";

  isButton: boolean;
  title: string;
  onPress?: () => void;
}) => {
  const isSelected = false;
  return (
    <ChipView
      onPress={onPress}
      isSelected={isSelected}
      disabled={!isButton}
      size={size}
      title={title}
    >
      <ChipText isSelected={isSelected} variant="body">
        {title}
      </ChipText>
    </ChipView>
  );
};
