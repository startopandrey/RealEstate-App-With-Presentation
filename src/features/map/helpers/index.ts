import { OUTER_CARD_WIDTH } from "../../../utils/constants";

export const onScroll = (
  event,
  mapIndex,
  _map,
  apartmentsDisplayed,
  latDelta
) => {
  const xDistance = event.nativeEvent.contentOffset.x;
  if (xDistance % OUTER_CARD_WIDTH === 0) {
    // When scroll ends
    const index = xDistance / OUTER_CARD_WIDTH;
    if (mapIndex.current === index) {
      return;
    }
    console.log("scroll end reached");
    mapIndex.current = index;
    const coordinate =
      apartmentsDisplayed[index] && apartmentsDisplayed[index].geometry;

    setTimeout(
      () =>
        _map.current?.animateToRegion(
          {
            latitude: coordinate.location.lat,
            longitude: coordinate.location.lng,
            latitudeDelta: latDelta,
            longitudeDelta: 0.01,
          },
          350
        ),
      10
    );
  }
};
