import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  formContainer: {
    width: "95%",
    marginTop: 40,
    margin: 10,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10, // Adjusted spacing here
    color: "#111",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#FF9900",
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
  linkText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});

export default styles;
