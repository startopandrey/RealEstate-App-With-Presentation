import { colors, ColorTypes } from "./colors";
import { space, lineHeights, LineHeightsType, SpaceType } from "./spacing";
import { sizes, SizesType } from "./sizes";
import { DefaultTheme } from "styled-components/native";
import {
  fonts,
  fontWeights,
  fontSizes,
  FontsType,
  FontSizesType,
  FontWeightsType,
} from "./fonts";

export interface ThemeType {
  colors: ColorTypes;
  space: SpaceType;
  lineHeights: LineHeightsType;
  sizes: SizesType;
  fonts: FontsType;
  fontSizes: FontSizesType;
  fontWeights: FontWeightsType;
}
export const theme: DefaultTheme = {
  colors,
  space,
  lineHeights,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
};
