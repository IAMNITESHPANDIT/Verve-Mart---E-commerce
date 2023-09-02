import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    margin: "20%",
    marginTop: 30,
    textAlign: "center",
  },
  carouselItem: {
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    elevation: 2,
    minWidth: 100,
  },
  carouselImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  carouselDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
