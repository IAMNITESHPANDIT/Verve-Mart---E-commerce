import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./profile.style.scss";
import { get, post } from "../../services/networkCalls";
import {
  GET_USER_DETAIL,
  LOGOUT_USER,
  UPDATE_USER_DETAIL,
} from "../../services/endPoints";
import { ToastOnFailure, ToastOnSuccess } from "../../utils/toast/message";
import GenricLoader from "../../utils/loader/Loader";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone must be 10 digits"),
});

interface profileProps {
  setSigninStatus: any;
}
const ProfileSection: React.FC<profileProps> = ({ setSigninStatus }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response: any = await post(
        UPDATE_USER_DETAIL,
        {
          name: values.name,
          email: values.email,
          phoneNumber: values.phone,
        },
        sessionStorage.getItem("AUTH_TOKEN") || ""
      );
      ToastOnSuccess(response.message);
    } catch (error) {
      console.log("error", error);
    } finally {
      // Set isSubmitting to false regardless of success or failure
      setSubmitting(false);
    }
  };

  const fetchDetails = async () => {
    try {
      const response: any = await get(
        GET_USER_DETAIL,
        sessionStorage.getItem("AUTH_TOKEN") || ""
      );
      setProfile({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const logoutUser = async () => {
    try {
      const response: any = await get(
        LOGOUT_USER,
        sessionStorage.getItem("AUTH_TOKEN") || ""
      );
      ToastOnSuccess(response.message);
      sessionStorage.clear();
      setSigninStatus(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="profile-edit-page container">
      <div className="profile-details">
        <h2>Edit Profile</h2>
        <Formik
          initialValues={profile} // Use profile as initial values
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true} // Add enableReinitialize prop
        >
          {({ isSubmitting }) => (
            <Form>
              {isSubmitting && <GenricLoader loading={isSubmitting} />}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Field type="tel" id="phone" name="phone" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>

              <div className="actions">
                <button
                  type="submit"
                  className="update-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Profile"}
                </button>
                <button className="logout-button" onClick={() => logoutUser()}>
                  Logout
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileSection;
