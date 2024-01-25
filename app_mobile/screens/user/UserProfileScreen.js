import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import { Ionicons } from "@expo/vector-icons";
import OptionList from "../../components/OptionList/OptionList";
import colors from "../../colors/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const UserProfileScreen = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState({});
  const { user } = route.params;
  const cartproduct = useSelector((state) => state.product);

  const convertToJSON = (obj) => {
    try {
      setUserInfo(JSON.parse(obj));
    } catch (e) {
      setUserInfo(obj);
    }
  };
  // _CartData = async (user, cart) => {
  //   try {
  //     await AsyncStorage.setItem("cartData", JSON.stringify({ _user: user, _cart: cart }));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const logout = async (user, cart) => {
    if (cartproduct.length > 0) {
      // await _CartData(user, cart);
      await AsyncStorage.removeItem("authUser");
      navigation.replace("login");
    } else {
      await AsyncStorage.removeItem("authUser");
      navigation.replace("login");
    }


  }
  useEffect(() => {
    convertToJSON(user);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.screenNameContainer}>
        <Text style={styles.screenNameText}>Profile</Text>
      </View>
      <View style={styles.UserProfileCardContianer}>
        <UserProfileCard
          Icon={Ionicons}
          name={userInfo.name}
          email={userInfo.email}
        />

      </View>
      <View style={styles.OptionsContainer}>
        <OptionList
          text={"Order"}
          Icon={Ionicons}
          iconName={"cart-outline"}
          onPress={async () => {
            navigation.navigate("order", { user: user });
          }}
        />
        <OptionList
          text={"Logout"}
          Icon={Ionicons}
          iconName={"log-out"}
          onPress={() => logout(user, cartproduct)}
        />
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  UserProfileCardContianer: {
    width: "100%",
    height: "25%",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  OptionsContainer: {
    width: "100%",
  },
});
