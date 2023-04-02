import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import API_REQUEST from "../../../api/Request";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(API_REQUEST.LOGIN_URI, {
        email: email,
        password: password,
      })
      .then((response) => {
        setLoading(false);
        if (response.data.status === "success") {
          // Handle successful login here
          AsyncStorage.setItem("userData", JSON.stringify(response.data.data));
          AsyncStorage.setItem("userToken", response.data.token);
          // Redirect to HomeScreen
          navigation.navigate("HomeScreen");
          // Alert.alert("Success", "Logged in successfully");
        } else {
          // Handle login errors here
          setError("Invalid credentials!");
          // Alert.alert("Error", "Invalid email or password");
        }
      })
      .catch((error) => {
        setLoading(false);
        // Handle API errors here
        console.log(error);
        Alert.alert("Error", "An error occurred");
      });
  };

  const handleRegisterPress = () => {
    navigation.navigate("RegistrationScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator color="blue" />
          ) : (
            <Button title="Sign In" onPress={handleSubmit} />
          )}
        </View>
        {error && (
          <Text style={{ color: "red", marginTop: 10 }}>
            {error && error.toString()}
          </Text>
        )}
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={{ marginTop: 10 }}>
            Don't have an account?
            <Text style={{ fontWeight: "bold", color: "blue" }}>
              &nbsp;create one
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#44A7C4",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  loginText: {
    marginTop: 20,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
