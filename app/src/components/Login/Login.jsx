import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
// import { useDispatch } from "react-redux";
import logoImage from "../../assests/images/logo.png";
import { loginStyles } from "./login.style";
import { post } from "../../services/networkCalls";
import { LOGIN } from "../../services/endPoints";
import { ToastOnFailure, ToastOnSuccess } from "../../utils/toast/message";
import { saveData } from "../../utils/storage/storage";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = ({ setSigninStatus }) => {
  // const dispatch = useDispatch();
  const [isFlag, setIsFlag] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await post(LOGIN, values);
      if (response) {
        ToastOnSuccess(response?.message);
        await saveData("AUTH_TOKEN", response.data.token);
      }
    } catch (error) {
      ToastOnFailure(error.response.data.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={loginStyles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
          <View>
            <View style={loginStyles.imgContainer}>
              <Image source={logoImage} style={loginStyles.logo} />
            </View>
            <Text style={loginStyles.heading}>Login</Text>
            <TextInput
              placeholder="Email"
              onChangeText={handleChange("email")}
              value={values.email}
              style={loginStyles.input}
            />
            {errors.email && (
              <Text style={loginStyles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              placeholder="Password"
              onChangeText={handleChange("password")}
              value={values.password}
              secureTextEntry
              style={loginStyles.input}
            />
            {errors.password && (
              <Text style={loginStyles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity
              style={loginStyles.button}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text>{isSubmitting ? "Submitting..." : "Login"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={loginStyles.signUpButton}
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

export default Login;
