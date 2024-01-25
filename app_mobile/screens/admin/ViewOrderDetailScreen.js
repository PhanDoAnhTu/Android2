import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../colors/Colors";
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";
import BasicProductList from "../../components/BasicProductList/BasicProductList";
import CustomButton from "../../components/CustomButton/CustomButton";
import DropDownPicker from "react-native-dropdown-picker";
import order_service from "../../services/frontend/order_service";

const ViewOrderDetailScreen = ({ navigation, route }) => {
  const { order, admin } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [label, setLabel] = useState("Loading..");
  const [error, setError] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [statusDisable, setStatusDisable] = useState(false);
  const [order_total, setOrder_total] = useState(0);

  const [items, setItems] = useState([
    { label: "Pending", value: "pending" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
  ]);
  const [orderdetails, setOrderdetails] = useState([]);

  function tConvert(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? "AM" : "PM";
      time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
  }

  const dateFormat = (datex) => {
    let t = new Date(datex);
    const date = ("0" + t.getDate()).slice(-2);
    const month = ("0" + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    const hours = ("0" + t.getHours()).slice(-2);
    const minutes = ("0" + t.getMinutes()).slice(-2);
    const seconds = ("0" + t.getSeconds()).slice(-2);
    const time = tConvert(`${hours}:${minutes}:${seconds}`);
    const newDate = `${date}-${month}-${year}, ${time}`;

    return newDate;
  };

  const handleUpdateStatus = (id) => {
    setIsloading(true);
    setError("");
    setAlertType("error");

    fetch(
      `${network.serverip}/admin/order-status?orderId=${id}&status=${value}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success == true) {
          setError(`Order status is successfully updated to ${value}`);
          setAlertType("success");
          setIsloading(false);
        }
      })
      .catch((error) => {
        setAlertType("error");
        setError(error);
        console.log("error", error);
        setIsloading(false);
      });
  };

  useEffect(() => {
    try {
      (async function () {
        const orders_data = await order_service.getOrder_ByCustomer(order.user_id);
        setOrderdetails(orders_data.data.order_detail);
        const orderdetailById = orders_data.data.order_detail.filter(orderdetail => orderdetail.order_id === order.id);
        setOrder_total(
          orderdetailById.reduce((accumulator, object) => {
            return (accumulator + (object.price * object.qty));
          }, 0)
        );
      })();
    } catch (error) {
      console.log(error);
    } 

    setError("");
    setAlertType("error");
    if (order?.status == 1) {
      setStatusDisable(true);
    } else {
      setStatusDisable(false);
    }
    setValue(order?.status);
    setAddress(
      order?.address
    );
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
          <Text style={styles.screenNameText}>Order Details</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            View all detail about order
          </Text>
        </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      <ScrollView
        style={styles.bodyContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerNameContainer}>
          <View>
            <Text style={styles.containerNameText}>Ship & Bill to</Text>
          </View>
        </View>
        <View style={styles.ShipingInfoContainer}>
          <Text style={styles.secondarytextMedian}>
            {order.name}
          </Text>
          <Text style={styles.secondarytextMedian}>
            {order.email}
          </Text>
          <Text style={styles.secondarytextSm}>{address}</Text>
        </View>
        <View>
          <Text style={styles.containerNameText}>Order Info</Text>
        </View>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.secondarytextMedian}>
            Order # {order.id}
          </Text>
          <Text style={styles.secondarytextSm}>
            Ordered on {dateFormat(order?.updated_at)}
          </Text>
          {/* {orderDetail?.shippedOn && (
            <Text style={styles.secondarytextSm}>
              Shipped on {orderDetail?.shippedOn}
            </Text>
          )}
          {orderDetail?.status && (
            <Text style={styles.secondarytextSm}>
              Delivered on {order?.status}
            </Text>
          )} */}
        </View>
        <View style={styles.containerNameContainer}>
          <View>
            <Text style={styles.containerNameText}>Package Details</Text>
          </View>
        </View>
        <View style={styles.orderItemsContainer}>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>Package</Text>
            <Text>{value}</Text>
          </View>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>
              Order on : {dateFormat(order?.created_at)}
            </Text>
          </View>
          <ScrollView
            style={styles.orderSummaryContainer}
            nestedScrollEnabled={true}
          >
            {orderdetails?.map((product, index) => (
              <View key={index}>
                <BasicProductList
                  title={product?.product_name}
                  price={product?.price}
                  quantity={product?.qty}
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>Total</Text>
            {/* {order_total.map((o_total)=>{
              if(o_total.order_id===order_total.id){
                return(
                  <Text>{o_total.total} Đ</Text>
                )
              }
            })} */}
            <Text>{order_total} Đ</Text>

          </View>
        </View>
        <View style={styles.emptyView}></View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View>
          <DropDownPicker
            style={{ width: 200 }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            disabled={statusDisable}
            disabledStyle={{
              backgroundColor: colors.light,
              borderColor: colors.white,
            }}
            labelStyle={{ color: colors.muted }}
          />
        </View>
        <View>
          {statusDisable == false ? (
            <CustomButton
              text={"Update"}
              onPress={() => handleUpdateStatus(order?.id)}
            />
          ) : (
            <CustomButton text={"Update"} disabled />
          )}
        </View>
      </View>
    </View>
  );
};

export default ViewOrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingBottom: 0,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 10,
    fontSize: 15,
  },
  bodyContainer: { flex: 1, width: "100%", padding: 5 },
  ShipingInfoContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.muted,
    elevation: 5,
    marginBottom: 10,
  },
  containerNameContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  containerNameText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.muted,
  },
  secondarytextSm: {
    color: colors.muted,
    fontSize: 13,
  },
  orderItemsContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,

    borderColor: colors.muted,
    elevation: 3,
    marginBottom: 10,
  },
  orderItemContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderItemText: {
    fontSize: 13,
    color: colors.muted,
  },
  orderSummaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    maxHeight: 220,
    width: "100%",
    marginBottom: 5,
  },
  bottomContainer: {
    backgroundColor: colors.white,
    width: "110%",
    height: 70,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingLeft: 10,
    paddingRight: 10,
  },
  orderInfoContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,

    borderColor: colors.muted,
    elevation: 1,
    marginBottom: 10,
  },
  primarytextMedian: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
  secondarytextMedian: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "bold",
  },
  emptyView: {
    height: 20,
  },
});
