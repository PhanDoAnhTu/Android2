import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import colors from "../../colors/Colors";
import { urlImage } from '../../config';

const CustomIconButton = ({ text, image, onPress, active }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: active ? colors.secondary : colors.white },
      ]}
      onPress={onPress}
    >
      <Image src={urlImage + "category/" + image} style={styles.buttonIcon} />
      <Text
        style={[
          styles.buttonText,
          { color: active ? colors.dark : colors.muted },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomIconButton;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 40,
    width: 150,
    elevation: 3,
    margin: 5,
  },
  buttonText: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: "bold",
  },
  buttonIcon: {
    height: 30,
    width: 35,
    resizeMode: "contain",
  },
});
