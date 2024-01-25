import {
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import React, { useState } from "react";
import colors from "../../colors/Colors";
import CustomInput from "../../components/CustomInput/CustomInput";
import header_logo from "../../assets/logo/AnhTuSHop.png";
import CustomButton from "../../components/CustomButton/CustomButton";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import user_service from "../../services/frontend/user_service";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  _storeData = async (user) => {
    try {
      await AsyncStorage.setItem("authUser", JSON.stringify(user));
      // const cart_data = await AsyncStorage.getItem("cartData");
      // console.log("cart_data_login: ",cart_data);
    } catch (error) {
      console.error(error);
    }
  };
  _AdminData = async (user) => {
    try {
      await AsyncStorage.setItem("authAdmin", JSON.stringify(user));
    } catch (error) {
      console.error(error);
    }
  };


  const loginHandle = async () => {
    if (email === "" || password === "") {
      alert("Xin hãy điền đầy đủ thông tin !");
    } else {
      try {
        const login_data = await user_service.login_customer({ email_login: email, password_login: password });
        if (login_data.data.kiemtra === "not_email") {
          alert(login_data.data.message);
        } else if (login_data.data.kiemtra === "err_password") {
          alert(login_data.data.message);
          setPassword('');
        } else if (login_data.data.kiemtra === true && login_data.data.role === 'customer') {
          await _storeData(login_data.data.customer);
          navigation.replace("tab", { user: login_data.data.customer });
        } else if (login_data.data.kiemtra === true && login_data.data.role === 'admin') {
         await _AdminData(login_data.data.admin);
         navigation.replace("dashboard", { admin: login_data.data.admin});
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <InternetConnectionAlert>
      <KeyboardAvoidingView
        style={styles.container}
      >
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <StatusBar></StatusBar>
          <View style={styles.welconeContainer}>
            <View>
              <Image style={styles.logo} source={header_logo} />
            </View>
          </View>
          <View style={styles.screenNameContainer}>
            <Text style={styles.screenNameText}>Login</Text>
          </View>
          <View style={styles.formContainer}>
            <CustomInput
              value={email}
              setValue={setEmail}
              placeholder={"Username"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
            <CustomInput
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
            <View style={styles.forgetPasswordContainer}>
              <Text
                style={styles.ForgetText}
                onPress={() =>navigation.navigate("forgotpassword")}
              >
                Forget Password?
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttomContainer}>
          <CustomButton text={"Login"} onPress={() => loginHandle()} />
        </View>
        <View style={styles.bottomContainer}>
          <Text>Don't have an account?</Text>
          <Text
            onPress={() => navigation.navigate("signup")}
            style={styles.signupText}
          >
            signup
          </Text>
        </View>
      </KeyboardAvoidingView>

    </InternetConnectionAlert>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  welconeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "30%",
  },
  formContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding: 5,
  },
  logo: {
    resizeMode: "contain",
    width: 80,
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: "bold",
    color: colors.muted,
  },
  welcomeParagraph: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.primary_shadow,
  },
  forgetPasswordContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ForgetText: {
    fontSize: 15,
    fontWeight: "600",
  },
  buttomContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    marginLeft: 2,
    color: colors.secondary,
    fontSize: 15,
    fontWeight: "600",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
});
