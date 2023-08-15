import React, { useState } from "react";
import styled from "styled-components/native";
import { Text } from "../typography/text.component";
import { Animated } from "react-native";
import { OUTER_CARD_WIDTH } from "../../utils/constants";
const TabsBarWrapper = styled.View`
  /* flex: 1; */

  background: ${(props) => props.theme.colors.bg.secondary};
  border-radius: ${(props) => props.theme.borderRadius.xl};
`;
const Tabs = styled.View`
  flex-direction: row;
  justify-content: space-between;

  padding: ${(props) => props.theme.space[3]};
  z-index: 99999;
`;
const Tab = styled.TouchableOpacity`
  width: 100px;
  z-index: 99999;
`;
const TabTitle = styled(Text)<{ isSelected: boolean }>`
  align-self: center;
  z-index: 99999;
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.text.primary
      : props.theme.colors.text.muted};
`;
const TabBackgoundAnimated = styled(Animated.View)`
  background: ${(props) => props.theme.colors.bg.primary};
  height: 5;
  position: absolute;

  top: ${(props) => props.theme.space[2]};
  left: 14;
  border-radius: ${(props) => props.theme.borderRadius.large};
  padding: ${(props) => props.theme.space[3]};
  width: 100;
  z-index: 0;
`;
interface TabType {
  name: string;
  id: string;
}
export const TabsBar = ({
  tabs,
  onPress,
  selectedIndex,
  setSelectedIndex,
}: {
  tabs: TabType[];
  onPress?: () => void;
  selectedIndex: number;
  setSelectedIndex: (number: number) => void;
}) => {
  const [translateValue] = useState(new Animated.Value(0));
  const backgoundWidth = (OUTER_CARD_WIDTH - 32 - 16) / 3;
  return (
    <TabsBarWrapper>
      <Tabs>
        {tabs.map((el, i) => (
          <Tab
            onPress={() => {
              setSelectedIndex(i);
              Animated.spring(translateValue, {
                toValue: i * backgoundWidth,

                useNativeDriver: true,
              }).start();
            }}
          >
            <TabTitle isSelected={selectedIndex === i} variant="label">
              {el.name}
            </TabTitle>
          </Tab>
        ))}
      </Tabs>
      <TabBackgoundAnimated
        style={[
          {
            transform: [{ translateX: translateValue }],
          },
        ]}
      />
    </TabsBarWrapper>
  );
};
