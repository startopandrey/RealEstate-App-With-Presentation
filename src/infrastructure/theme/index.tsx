import { colors, ColorTypes } from "./colors";
import { space, lineHeights, LineHeightsType, SpaceType } from "./spacing";
import { sizes, SizesType } from "./sizes";
import {
  fonts,
  fontWeights,
  fontSizes,
  FontsType,
  FontSizesType,
  FontWeightsType,
} from "./fonts";

export const theme: {
  colors: ColorTypes;
  space: SpaceType;
  lineHeights: LineHeightsType;
  sizes: SizesType;
  fonts: FontsType;
  fontSizes: FontSizesType;
  fontWeights: FontWeightsType;
} = {
  colors,
  space,
  lineHeights,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
};
