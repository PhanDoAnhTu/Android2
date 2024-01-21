import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import HomeScreen from "../../screens/user/HomeScreen";
import colors from "../../colors/Colors";
import CategoriesScreen from "../../screens/user/CategoriesScreen";
import UserProfileScreen from "../../screens/user/UserProfileScreen";


const Tab = createBottomTabNavigator();

const Tabs = ({ navigation, route }) => {
  const { user } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.secondary,

        tabBarIcon: ({ focused }) => {
          let routename = route.name;

          if (routename == "home") {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <FontAwesome name="home" size={30} color={colors.secondary} />

                ) : (
                  <FontAwesome name="home" size={30} color={colors.muted} />
                )}
              </TouchableOpacity>
            );
          } else if (routename == "categories") {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <Ionicons
                    name="ios-apps-sharp"
                    size={30}
                    color={colors.secondary}
                  />
                ) : (
                  <Ionicons
                    name="ios-apps-sharp"
                    size={30}
                    color={colors.muted}
                  />
                )}
              </TouchableOpacity>
            );
          }
          else if (routename == "user") {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <AntDesign
                    name="user"
                    size={30}
                    color={colors.secondary}
                  />
                ) : (
                  <AntDesign
                    name="user"
                    size={30}
                    color={colors.muted}
                  />)}
              </TouchableOpacity>
            );
          } 
        },
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.white,
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        initialParams={{ user: user }}
        tabBarOptions={{
          style: {
            position: "absolute",
          },
        }}
      />
      <Tab.Screen
        name="categories"
        component={CategoriesScreen}
        initialParams={{ user: user }}
        tabBarOptions={{
          tabBarHideOnKeyboard: true,
          style: {
            position: "absolute",
          },
        }}
      />
      <Tab.Screen
        name="user"
        component={UserProfileScreen}
        initialParams={{ user: user }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabIconStyle: {
    width: 10,
    height: 10,
  },
});
