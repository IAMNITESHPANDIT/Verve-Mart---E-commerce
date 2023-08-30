import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/components/Login/Login";
import Toast from "react-native-toast-message";
import Registration from "./src/components/SignUp/Registration";
export default function App() {
  return (
    <View>
      <Registration />
      <Toast
        bottomOffset={30}
        autoHide={true}
        visibilityTime={2000}
        position="top"
      />
    </View>
  );
}
