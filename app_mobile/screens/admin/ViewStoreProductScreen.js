import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../colors/Colors";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ProductList from "../../components/ProductList/ProductList";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomInput from "../../components/CustomInput/CustomInput";
import ProgressDialog from "react-native-progress-dialog";
import { urlImage } from '../../config';
import store_products_backend_service from "../../services/backend/store_products_service";
import store_products_service from "../../services/frontend/store_products_service";

const ViewStoreProductScreen = ({ navigation, route }) => {
  const { admin } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState("error");

  const [label, setLabel] = useState("Loading...");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");

  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchProduct();
    filter();
    setRefreshing(false);
  };

  const handleDelete = async (id) => {
    setIsloading(true);
    try {
      const exeRemove = await store_products_backend_service.remove_store_product({ "product_id": id, "rm": [] });
      if (exeRemove.data.success === true) {
        fetchProduct();
        setError(exeRemove.data.message);
        setAlertType("success");
        setIsloading(false);
      } else {
        setIsloading(false);
        setError(exeRemove.data.message);
        setAlertType("error");
      }
    } catch (error) {
      console.error(error);
      setIsloading(false);
      setError(error.message);
    }

  };


  const showConfirmDialog = (id) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete the product?",
      [
        {
          text: "Yes",
          onPress: () => {
            handleDelete(id);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  function fetchProduct() {
    (async function () {
      setIsloading(true);
      try {
        const products_data = await store_products_service.getNewProductAll(8, 1);
        if (products_data.data.success === true) {
          setProducts(products_data.data.new_products_all);
          setIsloading(false);
          // console.log("products: "+JSON.stringify(products_data.data.new_products_all));
        } else {
          console.log("error: " + products_data.data);
          setIsloading(false);
        }
      } catch (error) {
        console.error(error);
        setIsloading(false);
      }
    })();
  }


  const filter = () => {
    const keyword = filterItem;
    if (keyword !== "") {
      const results = products?.filter((product) => {
        return product?.product_name.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundItems(results);
    } else {
      setFoundItems(products);
    }
  };


  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    filter();
  }, [filterItem,products]);
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("addproduct", { authUser: authUser });
          }}
        >
          <AntDesign name="plussquare" size={30} color={colors.muted} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>View Product</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>View all products</Text>
        </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      <CustomInput
        radius={5}
        placeholder={"Search..."}
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
          <Text>{`No product found with the name of ${filterItem}!`}</Text>
        ) : (
          foundItems.map((product, index) => {
            return (
              <ProductList
                key={index}
                image={`${urlImage}product/${product?.product_image}`}
                title={product?.product_name}
                category={product?.category_name}
                price={product?.price_in_store}
                qantity={product?.store_qty}
                onPressView={() => {
                  console.log("view is working " + product.product_id);
                }}
                onPressEdit={() => {
                  navigation.navigate("editproduct", {
                    product: product,
                    authUser: admin,
                  });
                }}
                onPressDelete={() => {
                  showConfirmDialog(product.product_id);
                }}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default ViewStoreProductScreen;

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
