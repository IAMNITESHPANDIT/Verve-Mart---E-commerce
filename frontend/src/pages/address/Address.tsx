import React from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

import "./address.style.scss";

import { post } from "../../services/networkCalls";

import { ADD_ADDRESS, GET_ADDRESS } from "../../services/endPoints";

import { useEffect, useState } from "react";

import { ToastOnSuccess } from "../../utils/toast/message";

import AddressRadio from "./radios/AddressRadio";

import CustomButton from "../../components/customButton/CustomButton";

import { useNavigate, useParams } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  street: Yup.string().required("Street is required"),
  district: Yup.string().required("District is required"),
  state: Yup.string().required("State is required"),
  pinCode: Yup.string().required("Pincode is required"),
});

const AddressForm: React.FC = () => {
  const [address, setAddress] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState("");

  const [newAddressFlag, setNewAddressFlag] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  const user: any = JSON.parse(sessionStorage.getItem("USER_DETAIL") || "{}");

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    console.log("dev------>", values);
    try {
      setSubmitting(false);
      const response: any = await post(
        ADD_ADDRESS,
        {
          name: values.name,
          street: values.street,
          country: "India",
          state: values.state,
          dist: values.district,
          pincode: values.pinCode,
          userId: user.userId,
          phoneNumber: values.phoneNumber,
        },
        sessionStorage.getItem("AUTH_TOKEN") || ""
      );
      ToastOnSuccess(response.message);
      fetchAddress();
      setSubmitting(false);
      setNewAddressFlag(false);
    } catch (error) {
      console.log(error);
      // Handle error
      setSubmitting(false);
    }
  };

  const fetchAddress = async () => {
    try {
      const response: any = await post(
        GET_ADDRESS,
        { userId: user.userId },
        sessionStorage.getItem("AUTH_TOKEN") || ""
      );
      setAddress(response.address);
    } catch (error) {
      console.log(error);
    }
  };

  const onNavigate = (navigateId: string) => {
    navigate(`/payment/${params?.productId}/${navigateId}`);
    return;
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div className="address-form">
      <h2>Delivery Address</h2>
      {address.length > 0 && (
        <AddressRadio
          data={address}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          onNavigate={onNavigate}
        />
      )}
      {!newAddressFlag ? (
        <CustomButton
          btnName="Add New Address"
          btnEvent={() => setNewAddressFlag(true)}
        />
      ) : (
        <CustomButton
          btnName="Hide"
          btnEvent={() => setNewAddressFlag(false)}
        />
      )}
      {newAddressFlag && (
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
      )}
    </div>
  );
};

export default AddressForm;
