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
import store_products_service from "../../services/frontend/store_products_service";
import store_products_service_backend from "../../services/backend/store_products_service";
import { urlImage } from '../../config';

const ImportProductScreen = ({ navigation, route }) => {
    const { admin } = route.params;
    const [isloading, setIsloading] = useState(false);
    const [price, setPrice] = useState();
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState("");
    const [alertType, setAlertType] = useState("error");
    const [open, setOpen] = useState(false);
    const [statusDisable, setStatusDisable] = useState(false);
    const [idPro, setIdPro] = useState(0);

    
    const [items, setItems] = useState([
        { label: "Pending", value: 0, image: "" },
        { label: "Shipped", value: 1, image: "" },
        { label: "Delivered", value: 2, image: "" },
    ]);
    var payload = [];
    function fetchCategories() {
        (async function () {
            setIsloading(true);
            try {
                const cat_data = await store_products_service_backend.getProductAndStoreProduct().then(async (result) => {
                    if (result.data.success === true) {
                        setCategory(result.data.products_data);
                        result.data.products.forEach((cat) => {
                            let obj = {
                                label: cat.product_name,
                                value: cat.id,
                                image: cat.product_image,
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




    const addProductHandle = async () => {
        setIsloading(true);
        const addProduct = await {
            "product_id": idPro,
            "product_price": price,
            "product_qty": quantity
        }
        try {
            const exeAddProduct = await store_products_service_backend.add_store_product(addProduct);
            if (exeAddProduct.data.success === true) {
                setIsloading(false);
                setAlertType("success");
                setError(exeAddProduct.data.message);
            } else {
                alert(exeAddProduct.data.message);
                setIsloading(false);

            }

        } catch (err) {
            setIsloading(false);

            console.log(err);
        }


    };

    useEffect(() => {
        fetchCategories();
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
                    <Text style={styles.screenNameText}>Nhập hàng</Text>
                </View>
                <View>
                    <Text style={styles.screenNameParagraph}>Thông tin nhập</Text>
                </View>
            </View>
            <CustomAlert message={error} type={alertType} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, width: "100%" }}
            >
                <View style={styles.formContainer}>
                    {/* <View style={styles.imageContainer}>

                    </View> */}

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
                </View>
            </ScrollView>
            <DropDownPicker
                placeholder={"Chọn sản phẩm cần thêm"}
                open={open}
                value={category}
                items={items}
                onChangeValue={(e)=>console.log(setIdPro(e))}
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
                <CustomButton text={"Add Product"} onPress={() => addProductHandle()} />
            </View>
        </KeyboardAvoidingView>
    );
};

export default ImportProductScreen;

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
