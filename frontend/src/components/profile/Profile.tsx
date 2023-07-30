import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./profile.style.scss";
import { get } from "../../services/networkCalls";
import { GET_USER_DETAIL } from "../../services/endPoints";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
});

const ProfileSection: React.FC = (props: any) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [initialValue, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (values: any) => {
    // onUpdateProfile?.(values);
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

  useEffect(() => {
    setInitialValues({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });
  }, [profile]);

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="profile-edit-page container">
      <div className="profile-details">
        <h2>Edit Profile</h2>
        <Formik
          initialValues={initialValue}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
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
                <button
                  className="logout-button"
                  onClick={() => console.log("dev")}
                >
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
