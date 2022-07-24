import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { Text, Input, Button } from "@rneui/base";
import { auth, db } from "../Firebase";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);

function chainError(err) {
  return Promise.reject(err)
};

  //to test again
  const register = () => {
    if (username.length == 0 || password.length == 0 || email.length == 0) {
      alert("Please fill in all required fields!")
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (res) => {
          db.collection("profiles").doc(email).set({
          email: email,
          username: username,
          categories: [ {value: "Food"}, {value: "Entertainment"}, {value :"Transport"}, {value :"Health"}],
          expenses: [],
          budget: "No Budget Set",
          budgetStartDate: new Date().toISOString(),
          budgetEndDate: new Date().toISOString(),
          bills: []
        })})
        .then(() => alert("Successfully Registered"))
        .then(() => {navigation.navigate("Login")})
        // .catch((err) => alert(err.message));
        .catch((err) => {
          alert(err.message)
          chainError(err)
        })

    }
  };

  return (
    <ImageBackground
      style={ styles.imgBackground } 
      resizeMode='cover' 
      source={require('orbital-app/assets/Asset1.png')}>
      <View
        //behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback>
          <>
            <Text h3 style={{ marginBottom: 50, color: "#F1F2F6" }}>
              Create an Account!
            </Text>
            <View style={styles.inputContainer}>
              <Input
                placeholder="username"
                autofocus
                type="text"
                onChangeText={(text) => setUsername(text)}
                value={username}
              />
              <Input
                placeholder="email"
                type="email"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              <Input
                placeholder="password"
                type="password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
            </View>
          </>
        </TouchableWithoutFeedback>
        <TouchableOpacity
            onPress={register}
            style={styles.button}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: 300,
    marginTop: 20,
    backgroundColor: "#F1F2F6",
    borderRadius: 25,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#F1F2F6",
    width: "45%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 120
  },
  buttonOutlineText: {
    color:  "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 
  },
});

export default RegisterScreen;
