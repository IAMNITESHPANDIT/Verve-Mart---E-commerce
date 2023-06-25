import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./signup.style.scss";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const Registration: React.FC = () => {
  const initialValues: SignupFormValues = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

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

  const handleSubmit = (values: SignupFormValues) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <div className="container">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2 className="text-center mb-4">Signup</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="form-control"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-danger"
                />
              </div>

              <Button type="submit" variant="primary">
                Sign Up
              </Button>
            </Form>
          </Formik>
        </Col>
      </Row>
    </div>
  );
};

export default Registration;
