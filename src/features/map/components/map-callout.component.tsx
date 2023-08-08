import React from "react";

import { CompactApartmentCard } from "../../../components/apartment/compact-apartment-card.component";

export const MapCallout = ({ apartment }) => (
  <CompactApartmentCard isMap={true} apartment={apartment} />
);
