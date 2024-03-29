import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../colors/Colors";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomInput from "../../components/CustomInput/CustomInput";
import ProgressDialog from "react-native-progress-dialog";
import UserList from "../../components/UserList";
import user_service from "../../services/backend/user_service";

const ViewUsersScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const { admin } = route.params;
  const [user, setUser] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [label, setLabel] = useState("Loading...");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");



  const fetchUsers =async() => {

    setIsloading(true);
    await user_service.getAll()
      .then((result) => {
        if (result.data.success) {
          setUsers(result.data.users_data);
          setFoundItems(result.data.users_data);
          setError("");
        } else {
          setError(result.data.message);
        }
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        setError(error.message);
        console.log("error", error);
      });
  };

  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchUsers();
    setRefreshing(false);
  };

  const filter = () => {
    const keyword = filterItem;
    if (keyword !== "") {
      const results = users.filter((user) => {
        return user.name.toLowerCase().includes(keyword.toLowerCase());
      });

      setFoundItems(results);
    } else {
      setFoundItems(users);
    }
    setName(keyword);
  };

  useEffect(() => {
    filter();
  }, [filterItem]);

  useEffect(() => {
     fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <ProgressDialog visible={isloading} label={label} />
      <StatusBar></StatusBar>
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
        <TouchableOpacity disabled>
          <AntDesign name="user" size={25} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Người Dùng</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Xem tất cả người dùng</Text>
        </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      <CustomInput
        radius={5}
        placeholder={"Tìm kiếm..."}
        value={filterItem}
        setValue={setFilterItem}
      />
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refeshing} onRefresh={handleOnRefresh} />
        }
      >
        {foundItems && foundItems.length == 0 ? (
          <Text>{`No user found with the name of ${filterItem}!`}</Text>
        ) : (
          foundItems.map((item, index) => (
            <UserList
              key={index}
              username={item?.name}
              email={item?.email}
              usertype={item?.roles}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ViewUsersScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding: 5,
  },

  buttomContainer: {
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
});
