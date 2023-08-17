import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { PostStackNavigatorParamList } from "../../types/post";
import { PostScreen } from "../../features/post/screen/post.screen";

const PostStack = createStackNavigator<PostStackNavigatorParamList>();

export const PostNavigator = () => {
  return (
    <PostStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <PostStack.Screen name="Post" component={PostScreen} />
    </PostStack.Navigator>
  );
};
