import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 120,
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

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "center"
  },

  loadingContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 20,
    borderRadius: 8
  },

  loadingText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "500"
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
