import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import API_REQUEST from "../../../api/Request";

const RegistrationScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePhoneChange = (text) => {
    setPhone(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleCardNoChange = (text) => {
    setCardNo(text);
  };

  const handleLoginPress = () => {
    navigation.navigate("LoginScreen");
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true); // Show loader
      const response = await axios.post(API_REQUEST.REGISTER_URI, {
        username: username,
        email: email,
        phone: phone,
        password: password,
        card_no: cardNo,
      });
      const data = response.data;
      console.log(data);
      if (data.status === "success") {
        navigation.navigate("LoginScreen");
      } else if (data.status === "error") {
        Alert.alert(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  const populateForm = (data) => {
    setUsername(data.username);
    setEmail(data.email);
    setPhone(data.phone);
    setPassword(data.password);
    setCardNo(data.card_no);
  };

  useEffect(() => {
    // Fetch user data from the API and populate the form fields
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get();
        const data = response.data;
        populateForm(data);
      } catch (error) {
        setError("Error has been found!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Create an Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={handleUsernameChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Credit Card Number"
          value={cardNo}
          onChangeText={handleCardNoChange}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator color="blue" />
          ) : (
            <Button title="Sign Up" onPress={handleSubmit} />
          )}
        </View>
        {error && (
          <Text style={{ color: "red", marginTop: 10 }}>
            {error && error.toString()}
          </Text>
        )}
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={{ marginTop: 10 }}>
            Already have an account?
            <Text style={{ fontWeight: "bold", color: "blue" }}>
              &nbsp;Log in
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

export default RegistrationScreen;
