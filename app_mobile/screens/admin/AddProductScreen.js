import {
  StyleSheet,
  Text,
  Image,
  StatusBar,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import colors from "../../colors/Colors";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import * as ImagePicker from "expo-image-picker";
import ProgressDialog from "react-native-progress-dialog";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import category_service from "../../services/frontend/category_service";

const AddProductScreen = ({ navigation, route }) => {
  const { admin } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [statusDisable, setStatusDisable] = useState(false);
  const [items, setItems] = useState([
    { label: "Pending", value: 0 },
    { label: "Shipped", value: 1 },
    { label: "Delivered", value: 2 },
  ]);
  var payload = [];
  function fetchCategories() {
    (async function () {
      setIsloading(true);
      try {
        const cat_data = await category_service.get_CategoryByParentId(0).then(async (result) => {
          if (result.data.success === true) {
            setCategory(result.data.categories_data);
            result.data.categories_data.forEach((cat) => {
              let obj = {
                label: cat.name,
                value: cat.id,
              };
              payload.push(obj);
            });
            setItems(payload);
            setError("");
            // console.log("Category:",cat_data.data.categories_data);

            // console.log("selectedTab:", selectedTab);
            setIsloading(false);
          } else {
            console.log("error: " + cat_data.data);
            setIsloading(false);
          }
        });


      } catch (error) {
        console.error(error);
      }
    })();
  }


  const upload = async () => {
    console.log("upload-F:", image);

    // var formdata = new FormData();
    // formdata.append("photos", image,);

  };

  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      console.log(result);
      setImage(result.assets[0].uri);
      upload();
    }
  };

  const addProductHandle = () => {
    setIsloading(true);

    if (title == "") {
      setError("Please enter the product title");
      setIsloading(false);
    } else if (price == 0) {
      setError("Please enter the product price");
      setIsloading(false);
    } else if (quantity <= 0) {
      setError("Quantity must be greater then 1");
      setIsloading(false);
    } else if (image == null) {
      setError("Please upload the product image");
      setIsloading(false);
    } else {
     console.log(image);
    }
  };

  useEffect(() => {
    fetchCategories();
    console.log(categories);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar></StatusBar>
      <ProgressDialog visible={isloading} label={"Adding ..."} />
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
          <Text style={styles.screenNameText}>Thêm sản phẩm</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Chi tiết thêm</Text>
        </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: "100%" }}
      >
        <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            {image ? (
              <TouchableOpacity style={styles.imageHolder} onPress={pickImage}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.imageHolder} onPress={pickImage}>
                <AntDesign name="pluscircle" size={50} color={colors.muted} />
              </TouchableOpacity>
            )}
          </View>

          <CustomInput
            value={title}
            setValue={setTitle}
            placeholder={"Title"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={price}
            setValue={setPrice}
            placeholder={"Price"}
            keyboardType={"number-pad"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={quantity}
            setValue={setQuantity}
            placeholder={"Quantity"}
            keyboardType={"number-pad"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={description}
            setValue={setDescription}
            placeholder={"Description"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
        </View>
      </ScrollView>
      <DropDownPicker
        placeholder={"Chọn danh mục"}
        open={open}
        value={category}
        items={items}
        setOpen={setOpen}
        setValue={setCategory}
        setItems={setItems}
        disabled={statusDisable}
        disabledStyle={{
          backgroundColor: colors.light,
          borderColor: colors.white,
        }}
        labelStyle={{ color: colors.muted }}
        style={{ borderColor: "#fff", elevation: 5 }}
      />
      <View style={styles.buttomContainer}>
        <CustomButton text={"Add Product"} onPress={() => addProductHandle} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddProductScreen;

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
    justifyContent: "flex-start",
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
    marginTop: 10,
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
  imageContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 250,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageHolder: {
    height: 200,
    width: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 10,
    elevation: 5,
  },
});
