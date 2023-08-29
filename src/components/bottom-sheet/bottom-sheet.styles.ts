import BottomSheet from "@gorhom/bottom-sheet";
import styled from "styled-components/native";
export const BottomSheetStyled = styled(BottomSheet)`
  /* z-index: 99999; */
  border-radius: ${(props) => props.theme.borderRadius.xl};
`;
export const Header = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
export const ApartmentTypeWrapper = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const PriceWrapper = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const IconInput = styled.TextInput``;
export const CustomHandle = styled.View`
  width: 50px;
  height: 3px;
  align-self: center;
  position: absolute;
  top: 20px;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.text.muted};
`;
export const CustomHandleWrapper = styled.View`
  flex: 1;
  /* width: 100%; */
  height: 20px;
  padding: ${(props) => props.theme.space[2]};
  justify-content: center;
  align-content: center;
`;
export const BottomSheetBackground = styled.View`
  border-radius: ${(props) => props.theme.borderRadius.xl};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
