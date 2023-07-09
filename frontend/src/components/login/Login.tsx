import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./login.style.scss";
import { BASE_URL, LOGIN } from "../../services/endPoints";
import { post } from "../../services/networkCalls";

interface LoginFormValues {
  email: string;
  password: string;
}
interface iLogin {
  setSigninStatus: any;
}

const Login: React.FC<iLogin> = ({ setSigninStatus }) => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    // Handle form submission here
    console.log(values);
    try {
      const data: any = await post(`${BASE_URL}${LOGIN}`, values);
      sessionStorage.setItem("AUTH_TOKEN", data.data.token);
      setSigninStatus(true);
    } catch (error: any) {
      console.log("dev--->", error.response.data.error);
    }
  };

  return (
    <Container className="container">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2 className="text-center mb-4">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
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
              <div className="login-btn-div">
                <button type="submit">Login</button>
              </div>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;