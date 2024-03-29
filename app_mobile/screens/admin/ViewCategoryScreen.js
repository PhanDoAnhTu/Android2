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
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomInput from "../../components/CustomInput/CustomInput";
import ProgressDialog from "react-native-progress-dialog";
import CategoryList from "../../components/CategoryList";
import category_service_backend from "../../services/backend/category_service";
import category_service from "../../services/frontend/category_service";
import { urlImage } from '../../config';

const ViewCategoryScreen = ({ navigation, route }) => {
  const { admin } = route.params;
  const [user, setUser] = useState({});


  const [isloading, setIsloading] = useState(false);
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState("error");

  const [label, setLabel] = useState("Loading...");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");

  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchCategories();
    setRefreshing(false);
  };
  const handleEdit = (item) => {
    navigation.navigate("editcategories", {
      category: item,
      authUser: admin,
    });
  };
  const handleDelete = async (id) => {

    setIsloading(true);
    await category_service_backend.remove(id)
      .then((result) => {
        if (result.data.success) {
          fetchCategories();
          setError(result.data.message);
          setAlertType("success");
        } else {
          setError(result.data.message);
          setAlertType("error");
        }
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        setError(error.message);
        console.log("error", error);
      });
  };

  const showConfirmDialog = (id) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete the category?",
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

  function fetchCategories() {
    (async function () {
      setIsloading(true);

      try {
        const cat_data = await category_service.get_CategoryByParentId(0).then(async (result) => {
          if (result.data.success === true) {
            setCategories(result.data.categories_data);
            setFoundItems(result.data.categories_data);
            setError("");

          } else {
            setError(result.data.message);
          }
        });
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        setError(error.message);
        console.log("error", error);
      }
    })();
  }

  const filter = () => {
    const keyword = filterItem;
    if (keyword !== "") {
      const results = categories?.filter((item) => {
        return item?.name.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundItems(results);
    } else {
      setFoundItems(categories);
    }
  };

  useEffect(() => {
    filter();
  }, [filterItem]);

  useEffect(() => {
    fetchCategories();
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("addcategories", { authUser: authUser });
          }}
        >
          <AntDesign name="plussquare" size={30} color={colors.muted} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>View Categories</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>View all Categories</Text>
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
          <Text>{`No category found with the title of ${filterItem}!`}</Text>
        ) : (
          foundItems.map((item, index) => (
            <CategoryList
              icon={`${urlImage}category/${item?.image}`}
              key={index}
              title={item?.name}
              description={item?.description}
              onPressEdit={() => {
                handleEdit(item);
              }}
              onPressDelete={() => {
                showConfirmDialog(item?.id);
              }}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ViewCategoryScreen;

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
