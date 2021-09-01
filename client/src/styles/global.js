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
    padding: 10,
    backgroundColor: "#ffcccb",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6
  },

  successMsg: {
    fontFamily: "nunito-bold",
    padding: 10,
    backgroundColor: "#90EE90"
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
