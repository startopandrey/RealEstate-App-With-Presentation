import { useNetInfo } from "@react-native-community/netinfo";
export const useCheckNetworkConnection = (): boolean => {
  const netInfo = useNetInfo();
  console.log(netInfo);
  return netInfo.isConnected ?? false;
};
