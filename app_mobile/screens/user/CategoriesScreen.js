import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  FlatList,
  RefreshControl,
  Dimensions
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import colors from "../../colors/Colors";
import CustomIconButton from "../../components/CustomIconButton/CustomIconButton";
import ProductCard from "../../components/ProductCard/ProductCard";

import category_service from "../../services/frontend/category_service";
import store_products_service from "../../services/frontend/store_products_service";

const CategoriesScreen = ({ navigation, route }) => {
  const { categoryID } = route.params;
  const [category, setCategory] = useState([]);
  const [selectedTab, setSelectedTab] = useState(category[0]);
  const [refeshing, setRefreshing] = useState(false);
  const [products_cat, set_products_cat] = useState([]);
  navigation.addListener("focus", () => {
    if (categoryID) {
      setSelectedTab(categoryID);
    }
  });
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchCategory();
    setRefreshing(false);
  };
  function fetchCategory() {
    (async function () {
      try {
        const cat_data = await category_service.get_CategoryByParentId(0).then(async (result) => {
          if (result.data.success === true) {
            setCategory(result.data.categories_data);
            // console.log("Category:",cat_data.data.categories_data);

            // console.log("selectedTab:", selectedTab);
            const product_cat = await store_products_service.getProductByCategory(8, 1, selectedTab.id);
            set_products_cat(product_cat.data.ProductsByCategory);

          } else {
            console.log("error: " + cat_data.data);
          }
        });


      } catch (error) {
        console.error(error);
      } finally {
        console.log("productByCat: ", products_cat);

      }
    })();
  }


  const handleProductPress = (product) => {
    navigation.navigate("productdetail", { product: product });
  };
  useEffect(() => {
    fetchCategory();
  }, [selectedTab]);
  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.jumpTo("home");
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
        <View style={styles.topbarlogoContainer}>
          <Text style={styles.toBarText}>Categories</Text>
        </View>
        <View></View>
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate("cart")}
        >
          <FontAwesome5 name="shopping-cart" size={24} color={colors.muted} />

        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          data={category}
          keyExtractor={(index, item) => `${index}-${item}`}
          horizontal
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ padding: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: tab }) => (
            <CustomIconButton
              key={tab}
              text={tab.name}
              image={tab.image}
              active={selectedTab?.id === tab.id ? true : false}
              onPress={() => {
                setSelectedTab(tab);
              }}
            />
          )}
        />
        <View style={styles.noItemContainer}>
          {products_cat.length === 0 ? (
            <View style={styles.noItemContainer}>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.white,
                  height: 150,
                  width: 150,
                  borderRadius: 10,
                }}
              >

                <Text style={styles.emptyBoxText}>
                  There no product in this category
                </Text>
              </View>
            </View>
          ) : (
            <FlatList
              data={products_cat}
              refreshControl={
                <RefreshControl
                  refreshing={refeshing}
                  onRefresh={() => handleOnRefresh()}
                />
              }
              keyExtractor={(index, item) => `${index}-${item}`}
              contentContainerStyle={{ margin: 10 }}
              numColumns={2}
              renderItem={({ item: product }) => (
                <View
                  style={[
                    styles.productCartContainer,
                    { width: (windowWidth - windowWidth * 0.1) / 2 },
                  ]}
                >
                  <ProductCard
                    cardSize={"large"}
                    name={product.product_name}
                    image={product.product_image}
                    price={product.price_in_store}
                    quantity={product.qty}
                    onPress={() => handleProductPress(product)}
                  />
                  <View style={styles.emptyView}></View>
                </View>
              )}
            />
          )}
        </View>
      </View>

    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  topbarlogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
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
  bodyContainer: {
    flex: 1,
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,

    justifyContent: "flex-start",
    flex: 1,
  },
  cartIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemCountContainer: {
    position: "absolute",
    zIndex: 10,
    top: -10,
    left: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 22,
    width: 22,
    backgroundColor: colors.danger,
    borderRadius: 11,
  },
  cartItemCountText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 10,
  },
  productCartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    padding: 5,
    paddingBottom: 0,
    paddingTop: 0,
    marginBottom: 0,
  },
  noItemContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  emptyBoxText: {
    fontSize: 11,
    color: colors.muted,
    textAlign: "center",
  },
  emptyView: {
    height: 20,
  },
  buttonContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 10,
    height: 40,
    width: "100%",
  },

});
