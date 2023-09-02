import { View, Text, StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import CarouselComponent from "./src/components/Carousel/CarouselComponent";

export default function App() {
  return (
    <View>
      <StatusBar backgroundColor="#007AFF" barStyle="light-content" />
      <CarouselComponent />
      <Toast
        bottomOffset={30}
        autoHide={true}
        visibilityTime={2000}
        position="top"
      />
    </View>
  );
}
