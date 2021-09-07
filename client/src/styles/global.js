import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    alignItems: "center"
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
    color: "red"
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
    backgroundColor: "#e8e8e8",
    width: "100%",
    padding: 20,
    borderRadius: 8
  },
  filledButton: {
    backgroundColor: "purple",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 8
  },

  textButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 8
  },

  btnText: {
    fontFamily: "nunito-bold",
    color: "white",
    fontWeight: "500",
    fontSize: 16
  },

  textBtnText: {
    fontFamily: "nunito-regular",
    color: "black",
    fontWeight: "500",
    fontSize: 14
  },

  textButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 8
  }
});
