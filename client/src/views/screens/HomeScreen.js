import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user data exists in AsyncStorage
    AsyncStorage.getItem("userData").then((data) => {
      if (data !== null) {
        setUserData(JSON.parse(data));
        setIsUserLoggedIn(true);
      } else {
        navigation.navigate("LoginScreen");
      }
    });
  }, []);

  const navigation = useNavigation();

  const handleSignOut = async () => {
    // Clear user data from AsyncStorage and navigate to the Login screen
    await AsyncStorage.removeItem("userData");
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: "https://source.unsplash.com/random/400x400",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.title}>Welcome to Bima Mkononi</Text>
        {userData && (
          <>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>{userData.username}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userData.email}</Text>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{userData.phone}</Text>
            <Text style={styles.label}>Card No:</Text>
            <Text style={styles.value}>{userData.card_no}</Text>
          </>
        )}
      </View>
      <Button title="SIGN OUT" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default HomeScreen;
