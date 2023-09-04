import BottomSheet, { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import React, {
  RefObject,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  BottomSheetBackground,
  BottomSheetStyled,
  CustomHandle,
} from "./bottom-sheet.styles";
import { useSharedValue } from "react-native-reanimated";
import { CustomBackdrop } from "../../features/map/helpers";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { TouchableOpacity } from "react-native";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
type Props = {
  children: string | JSX.Element | JSX.Element[];
  onClose: () => void;
  isOpen: boolean;
  snapPointPercent?: string;
};

export const CustomBottomSheet = forwardRef(
  (
    { children, onClose, isOpen, snapPointPercent = "70%" }: Props,
    ref
  ): React.ReactElement => {
    const snapPoints = useMemo(() => [snapPointPercent], [snapPointPercent]);
    const animatedIndex = useSharedValue(isOpen ? 0 : -1);
    const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
    }, []);
    const customBackground: React.FC<BottomSheetBackgroundProps> = ({
      pointerEvents,
      style,
    }) => {
      return (
        <BottomSheetBackground pointerEvents={pointerEvents} style={[style]} />
      );
    };

    return (
      <BottomSheetStyled
        ref={ref}
        backgroundComponent={customBackground}
        index={isOpen ? 0 : -1}
        animatedIndex={animatedIndex}
        handleComponent={() => <CustomHandle />}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={onClose}
        backdropComponent={(props) => CustomBackdrop({ ...props, ref })}
        onChange={handleSheetChanges}
      >
        {children}
      </BottomSheetStyled>
    );
  }
);
