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
import InternetConnectionAlert from "react-native-internet-connection-alert";
import user_service from "../../services/frontend/user_service";
const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [user_name, setUserName] = useState("");
  const [phone, setPhone] = useState("");

  const signUpHandle = async () => {
    if (email == "") {
      return alert("Please enter your email");
    }
    if (name == "") {
      return alert("Please enter your name");
    }
    if (password == "") {
      return alert("Please enter your password");
    }
    if (!email.includes("@")) {
      return alert("Email is not valid");
    }
    if (email.length < 6) {
      return alert("Email is too short");
    }
    if (password.length < 5) {
      return alert("Password must be 6 characters long");
    }
    if (password != confirmPassword) {
      return alert("password does not match");
    }
    try {
      const register = await user_service.register_customer({ customer_name: name, email_register: email, user_name: user_name, password_register: password, phone: phone });
      if (register.data.success === true) {
        alert(register.data.message);
        navigation.replace("login");
      } else if (register.data.success === false) {
        alert(register.data.message);
      }
    }
    catch (error) {
      console.error(error);
    }

  };
  return (
    <InternetConnectionAlert
      onChange={(connectionState) => {
        console.log("Connection State: ", connectionState);
      }}
    >
      <KeyboardAvoidingView style={styles.container}>
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
        <ScrollView style={{ flex: 1, width: "100%" }}>

          <View style={styles.screenNameContainer}>
            <View>
              <Text style={styles.screenNameText}>Sign up</Text>
            </View>
            <View>
              <Text style={styles.screenNameParagraph}>
                Create your account on AnhTuShop to get an access to millions of
                products
              </Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <CustomInput
              value={name}
              setValue={setName}
              placeholder={"Name"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
            <CustomInput
              value={user_name}
              setValue={setUserName}
              placeholder={"User Name"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
            <CustomInput
              value={email}
              setValue={setEmail}
              placeholder={"Email"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
            <CustomInput
              value={phone}
              setValue={setPhone}
              placeholder={"Phone"}
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
            <CustomInput
              value={confirmPassword}
              setValue={setConfirmPassword}
              secureTextEntry={true}
              placeholder={"Confirm Password"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
          </View>
        </ScrollView>
        <View style={styles.buttomContainer}>
          <CustomButton text={"Sign up"} onPress={signUpHandle} />
        </View>
        <View style={styles.bottomContainer}>
          <Text>Already have an account?</Text>
          <Text
            onPress={() => navigation.navigate("login")}
            style={styles.signupText}
          >
            Login
          </Text>
        </View>
      </KeyboardAvoidingView>
    </InternetConnectionAlert>
  );
};

export default SignupScreen;

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
  welconeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
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
  logo: {
    resizeMode: "contain",
    width: 80,
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
