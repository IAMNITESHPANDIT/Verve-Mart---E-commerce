import { StyleSheet } from "react-native";
export const loginStyles = StyleSheet.create({
  container: {
    margin: 20,
  },
  heading: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#febd69",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "#febd69",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#131921",
  },
  logo: {
    width: 100, // Set the desired width
    height: 100, // Set the desired height
    marginBottom: 20,
    width: 100,
    borderRadius: 50,
  },
  imgContainer: {
    textAlign: "center",
    minWidth: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
