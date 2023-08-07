import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { loggedIn } from "../../store/reducers/user";
// import { post } from "../../services/networkCalls";
// import { BASE_URL, LOGIN } from "../../services/endPoints";
// import { ToastOnFailure, ToastOnSuccess } from "../../utils/toast/message";
import logoImage from "../../assests/images/logo.png";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = ({ setSigninStatus }) => {
  // const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("values", values);
    try {
      // const data = await post(`${BASE_URL}${LOGIN}`, values);
      // // Store user data and token as needed
      // ToastOnSuccess(data.message);
      // dispatch(loggedIn(data.data));
      // setSigninStatus(true);
    } catch (error) {
      // ToastOnFailure(error.response.data.error);
    } finally {
      // setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
          <View>
            <View style={styles.imgContainer}>
              <Image source={logoImage} style={styles.logo} />
            </View>
            <Text style={styles.heading}>Login</Text>
            <TextInput
              placeholder="Email"
              onChangeText={handleChange("email")}
              value={values.email}
              style={styles.input}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              placeholder="Password"
              onChangeText={handleChange("password")}
              value={values.password}
              secureTextEntry
              style={styles.input}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text>{isSubmitting ? "Submitting..." : "Login"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpButton}
              // onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      {/* <Text>hello</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Login;
