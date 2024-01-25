import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../colors/Colors";
import CustomCard from "../../components/CustomCard/CustomCard";
import OptionList from "../../components/OptionList/OptionList";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressDialog from "react-native-progress-dialog";

const DashboardScreen = ({ navigation, route }) => {
  const { admin } = route.params;
  const [user, setUser] = useState(admin);



  const fetchStats = () => {

  };


  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <InternetConnectionAlert>
      <View style={styles.container}>
        <StatusBar></StatusBar>
        <View style={styles.topBarContainer}>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem("authAdmin");
              navigation.replace("login");
            }}
          >
            <Ionicons name="log-out" size={30} color={colors.muted} />
          </TouchableOpacity>
          <View>
            <Text style={styles.toBarText}>Quản trị</Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="person-circle-outline"
              size={30}
              color={colors.muted}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headingContainer}>
          <MaterialCommunityIcons name="menu-right" size={30} color="black" />
          <Text style={styles.headingText}>Danh Mục</Text>
        </View>
        <View style={{ flex: 1, width: "100%" }}>
          <ScrollView style={styles.actionContainer}>
          <OptionList
              text={"Categories"}
              Icon={Ionicons}
              iconName={"menu"}
              onPress={() =>
                navigation.navigate("viewcategories", { admin: user })
              }
              onPressSecondary={() =>
                navigation.navigate("addcategories", { admin: user })
              }
              type="morden"
            />
            <OptionList
              text={"Products"}
              Icon={Ionicons}
              iconName={"md-square"}
              onPress={() =>
                navigation.navigate("viewproduct", { admin: user })
              }
              onPressSecondary={() =>
                navigation.navigate("addproduct", { admin: user })
              }
              type="morden"
            />

            <OptionList
              text={"Import Products"}
              Icon={Ionicons}
              iconName={"md-square"}
              onPress={() =>
                navigation.navigate("viewstoreproduct", { admin: user })
              }
              onPressSecondary={() =>
                navigation.navigate("importproduct", { admin: user })
              }
              type="morden"
            />
            <OptionList
              text={"Orders"}
              Icon={Ionicons}
              iconName={"cart"}
              onPress={() =>
                navigation.navigate("vieworder", { admin: user })
              }
              type="morden"
            />
            <OptionList
              text={"Users"}
              Icon={Ionicons}
              iconName={"person"}
              onPress={() =>
                navigation.navigate("viewusers", { admin: user })
              }
              type="morden"
            />

            <View style={{ height: 20 }}></View>
          </ScrollView>
        </View>
      </View>
    </InternetConnectionAlert>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    width: "100%",
  },
  headingContainer: {
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  headingText: {
    fontSize: 20,
    color: colors.muted,
    fontWeight: "800",
  },
  actionContainer: { padding: 20, width: "100%", flex: 1 },
});
