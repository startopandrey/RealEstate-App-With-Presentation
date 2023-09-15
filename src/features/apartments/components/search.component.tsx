import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { LocationContext } from "../../../services/location/location.context";
import { theme } from "../../../infrastructure/theme";
import { Ionicons } from "@expo/vector-icons";
const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
const CustomSearchbar = styled(Searchbar)`
  background: ${(props) => props.theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[2]};
  font-family: ${(props) => props.theme.fonts.ralewayMedium};
  font-size: ${(props) => props.theme.fontSizes.body};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  elevation: 0;
`;
export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);
  return (
    <SearchContainer>
      <CustomSearchbar
        iconColor={theme.colors.text.primary}
        // clearIcon={() => <Ionicons name="close-outline"></Ionicons>}
        placeholder="Search for a location"
        value={searchKeyword}
        inputStyle={{
          color: theme.colors.text.primary,
          fontFamily: theme.fonts.ralewayMedium,
        }}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
