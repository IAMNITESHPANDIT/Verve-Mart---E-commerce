import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import DrawerLayout from "react-native-drawer-layout";

class MyDrawerApp extends Component {
  render() {
    return (
      <DrawerLayout
        drawerWidth={200}
        drawerPosition="left"
        renderNavigationView={() => (
          <View>
            <Text>Drawer Content</Text>
          </View>
        )}
      >
        <View>
          <Text>Main Content</Text>
          <Button
            title="Open Drawer"
            onPress={() => this.drawer.openDrawer()}
          />
        </View>
      </DrawerLayout>
    );
  }
}

export default MyDrawerApp;
