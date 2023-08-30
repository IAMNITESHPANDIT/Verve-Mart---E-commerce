import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./Registration.style";
import { SIGN_UP } from "../../services/endPoints";
import { ToastOnFailure, ToastOnSuccess } from "../../utils/toast/message";
import { post } from "../../services/networkCalls";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
});

const Registration = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      const response = await post(SIGN_UP, values);
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
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Account</Text>

            <View style={styles.formGroup}>
              <Text>Your Name</Text>
              <TextInput
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                style={styles.input}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text>Email</Text>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={styles.input}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text>Password</Text>
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                style={styles.input}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text>Phone Number</Text>
              <TextInput
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                value={values.phoneNumber}
                style={styles.input}
                keyboardType="phone-pad"
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            <Text style={styles.infoText}>
              By creating an account, you agree to Verve-Mart's{" "}
              <Text style={styles.linkText}>Conditions of Use</Text> and{" "}
              <Text style={styles.linkText}>Privacy Notice</Text>.
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Registration;
