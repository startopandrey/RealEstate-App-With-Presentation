import { useNetInfo } from "@react-native-community/netinfo";
export const useCheckNetworkConnection = (): boolean => {
  const netInfo = useNetInfo();

  return netInfo.isConnected ?? false;
};
