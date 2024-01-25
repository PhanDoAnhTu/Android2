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
import mail_service from "../../services/mail/mail_service";
const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  function resetOTP() {
    setTimeout(() => {
      setOTP_RanDom(null);
    }, 300000);
  }

  const signUpHandle = async () => {
    if (email == "") {
      return alert("Please enter your email");
    }
    if (!email.includes("@")) {
      return alert("Email is not valid");
    }
    if (email.length < 6) {
      return alert("Email is too short");
    }
    const otp = await Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    let email_data = new FormData();
    email_data.append("to_email", email);
    email_data.append("otp", otp);
    try {
      await mail_service.send_mail(email_data); 
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
              <Text style={styles.screenNameText}>Quên mật khẩu</Text>
            </View>
            <View>
              <Text style={styles.screenNameParagraph}>
                Hãy nhập email mà bạn đã đăng ký
              </Text>
            </View>
          </View>
          <View style={styles.formContainer}>

            <CustomInput
              value={email}
              setValue={setEmail}
              placeholder={"Email"}
              placeholderTextColor={colors.muted}
              radius={5}
            />

          </View>
        </ScrollView>
        <View style={styles.buttomContainer}>
          <CustomButton text={"Sign up"} onPress={signUpHandle} />
        </View>

      </KeyboardAvoidingView>
    </InternetConnectionAlert>
  );
};

export default ForgotPassword;

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
