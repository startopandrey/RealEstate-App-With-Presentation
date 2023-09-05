import styled from "styled-components/native";
import { Text } from "../typography/text.component";
import { TitleType } from "./title.d";
import React from "react";

const TitleRegular = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.latoRegular};
  text-transform: inherit;
  text-align: left;
`;
const TitleBold = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.h4};
  text-transform: inherit;
  text-align: left;
`;
const TitleWrapper = styled.Text`
  width: 70%;
  line-height: 35%;
  text-align: left;
`;
export const Title = ({ titleArray }: { titleArray: TitleType[] }) => {
  return (
    <TitleWrapper>
      {titleArray.map((title) => {
        if (title.fontWeight !== "bold") {
          return <TitleRegular variant="title">{title.text}</TitleRegular>;
        } else {
          return <TitleBold variant="title"> {title.text}</TitleBold>;
        }
      })}
    </TitleWrapper>
  );
};
