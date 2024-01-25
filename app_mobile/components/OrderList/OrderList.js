import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../colors/Colors";

function getTime(date) {
  let t = new Date(date);
  const hours = ("0" + t.getHours()).slice(-2);
  const minutes = ("0" + t.getMinutes()).slice(-2);
  const seconds = ("0" + t.getSeconds()).slice(-2);
  let time = `${hours}:${minutes}:${seconds}`;
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? " AM" : " PM";
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
  const newDate = `${date}-${month}-${year}`;

  return newDate;
};

const OrderList = ({ item, orders_detail, order_total, onPress }) => {
  const [quantity, setQuantity] = useState(0);

  function formatCash(number) {
    let str = String(number);
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }
  useEffect(() => {
    let packageItems = 0;
    orders_detail?.forEach((item_detail) => {
      if (item_detail.order_id == item.id) {
        ++packageItems;
      }
    });
    setQuantity(packageItems);

  }, [orders_detail, item]);

  return (
    <View style={styles.container}>
      <View style={styles.innerRow}>
        <View>
          <Text style={styles.primaryText}>Order # {item?.id}</Text>
        </View>
        <View style={styles.timeDateContainer}>
          <Text style={styles.secondaryTextSm}>
            {dateFormat(item?.created_at)}
          </Text>
          <Text style={styles.secondaryTextSm}>{getTime(item?.created_at)}</Text>
        </View>
      </View>
      {item?.name && (
        <View style={styles.innerRow}>
          <Text style={styles.secondaryText}>{item?.name} </Text>
        </View>
      )}
      {item?.email && (
        <View style={styles.innerRow}>
          <Text style={styles.secondaryText}>{item?.email} </Text>
        </View>
      )}
      <View style={styles.innerRow}>
        {/* <Text style={styles.secondaryText}>Quantity : {quantity}</Text> */}
        {order_total != null && order_total.map((o_t) => {
          if (o_t.order_id === item.id) {
            return (
              <Text style={styles.secondaryText}>Total Amount : {formatCash(o_t.total)} Đ</Text>
            )
          }

        })}
      </View>
      <View style={styles.innerRow}>
        <TouchableOpacity style={styles.detailButton} onPress={onPress}>
          <Text>Details</Text>
        </TouchableOpacity>
        {item?.status == 0 ? <Text style={styles.secondaryText}>Chờ xử lý</Text>
          : (<Text style={styles.secondaryText}>Đang giao</Text>
          )}
      </View>
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "auto",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 1,
  },
  innerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  primaryText: {
    fontSize: 15,
    color: colors.dark,
    fontWeight: "bold",
  },
  secondaryTextSm: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: "bold",
  },
  secondaryText: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: "bold",
  },
  timeDateContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  detailButton: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    borderColor: colors.muted,
    color: colors.muted,
    width: 100,
  },
});
