import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../constants/colors";

const Button = ({ title, onPress = () => {} }) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={[style.button, { width: "90%", height: 50 }]}
      >
        <Text style={{color:COLORS.white, fontWeight: 'bold', fontSize: 18}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  button: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.blue,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
