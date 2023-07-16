import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./address.style.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  street: Yup.string().required("Street is required"),
  district: Yup.string().required("District is required"),
  state: Yup.string().required("State is required"),
  pinCode: Yup.string().required("Pincode is required"),
});

const AddressForm: React.FC = () => {
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      // Simulate form submission delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(values);
      // Submit form data to backend or perform any desired action

      setSubmitting(false);
    } catch (error) {
      console.log(error);
      // Handle error
      setSubmitting(false);
    }
  };

  return (
    <div className="address-form">
      <h2>Delivery Address</h2>
      <Formik
        initialValues={{
          name: "",
          phoneNumber: "",
          street: "",
          district: "",
          state: "",
          pinCode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-row">
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Field
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pinCode">Pin Code</label>
                  <Field
                    type="text"
                    name="pinCode"
                    id="pinCode"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="pinCode"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="street">Address</label>
                  <Field
                    type="text"
                    name="street"
                    id="street"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="street"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="district">District</label>
                  <Field
                    type="text"
                    name="district"
                    id="district"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="district"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <Field
                    type="text"
                    name="state"
                    id="state"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? "Submitting..." : "Save Address"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddressForm;
