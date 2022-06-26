import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
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


  const register = () => {
    if (username.length == 0 || password.length == 0 || email.length == 0) {
      alert("Please fill in all required fields!")
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(db.collection("profiles").doc(email).set({
          email: email,
          username: username,      
        }))
        .then(() => alert("Successfully Registered"))
        .then(() => {navigation.navigate("Login")})
        .catch((err) => alert(err.message));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback>
        <>
          <Text h3 style={{ marginBottom: 50 }}>
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
      <Button
        raised
        title="Register"
        onPress={register}
        containerStyle={styles.button}
      />
    </KeyboardAvoidingView>
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
  },
  button: {
    width: 200,
    marginBottom: 100,
  },
});

export default RegisterScreen;
