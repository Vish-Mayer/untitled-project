import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 24,
    flex: 0
  },
  titleText: {
    textAlign: "center",
    fontFamily: "nunito-bold",
    fontSize: 25,
    color: "#333",
    padding: 10
  },
  errorMsg: {
    fontFamily: "nunito-bold",
    backgroundColor: "#ffcccb"
  },

  successMsg: {
    fontFamily: "nunito-bold",
    backgroundColor: "#90EE90"
  },

  passwordMsg: {
    backgroundColor: "#ffcccb",
    borderColor: "#ddd"
  },

  paragraph: {
    marginVertical: 8,
    lineHeight: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 30,
    borderRadius: 6
  }
});
