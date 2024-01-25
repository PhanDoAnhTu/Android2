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
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomInput from "../../components/CustomInput/CustomInput";
import ProgressDialog from "react-native-progress-dialog";
import OrderList from "../../components/OrderList/OrderList";
import order_service from "../../services/backend/order_service";

const ViewOrdersScreen = ({ navigation, route }) => {
  const { admin } = route.params;
  const [user, setUser] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [label, setLabel] = useState("Loading...");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");
  const [order_total, setOrder_total] = useState(0);


  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchOrders();
    setRefreshing(false);
  };

  const handleOrderDetail = (item) => {
    navigation.navigate("vieworderdetails", {
      order: item,
      admin: admin
    });
  };

  const fetchOrders = async () => {

    setIsloading(true);
    await order_service.getAll()
      .then((result) => {
        if (result.data.success) {
          setOrders(result.data.orders_data);
          setFoundItems(result.data.orders_data);
          // console.log(result.data.orders_data);
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

  const filter = () => {
    const keyword = filterItem;
    if (keyword !== "") {
      const results = orders?.filter((item) => {
        return item?.email.toLowerCase().includes(keyword.toLowerCase());

      });
      setFoundItems(results);
    } else {
      setFoundItems(orders);
    }
  };
  useEffect(() => {
    filter();
  }, [filterItem]);

  useEffect(() => {
    fetchOrders();
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
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Hóa đơn</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Xem tất cả hóa đơn</Text>
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
        style={{ flex: 1, width: "100%", padding: 2 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refeshing} onRefresh={handleOnRefresh} />
        }
      >
        {foundItems && foundItems.length == 0 ? (
          <Text>{`No order found with the order # ${filterItem}!`}</Text>
        ) : (
          foundItems.map((order, index) => {
            return (
              <OrderList
                item={order}
                key={index}
                onPress={() => handleOrderDetail(order)}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default ViewOrdersScreen;

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
