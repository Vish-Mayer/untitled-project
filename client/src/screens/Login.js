import React from "react";
import { Text, View, Button } from "react-native";

const Login = ({ navigation }) => {
  return (
    <View>
      <View>
        <Button
          title="Don't have an account? Sign up here"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

export default Login;
