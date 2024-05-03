"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Select, Input } from "antd";
import { InputNumber } from "antd";
import { Formik } from "formik";
import axios from "axios";
import generateSerialNumberCode from "../utils/serialNumberGenerator";
import { apiUrls } from "../utils/apiEndpoints";

const { Option } = Select;

interface CustomerData {
  [key: string]: {
    orderNumbers: string[];
    serialNumbers: string[];
  };
}

const initialValues = {
  IOT: "",
  BMS: "",
  Chemistry: "",
  Voltage: "",
  Capacity: "",
  YearofMfg: "",
  MonthofMfg: "",
  PlantCode: "",
  CustomerCode: "",
  OrderNumber: "",
  SerialNumber: "",
};

const FormApp: React.FC = () => {
  const [customercode, setCustomercode] = useState<any[]>([]);
  const [orderNumbers, setOrderNumbers] = useState<CustomerData>({});
  const [serialNumbers, setSerialNumbers] = useState<CustomerData>({});
  const [selectedValue, setSelectedValue] = useState("");
  const [formValues, setFormValues] = useState<any>({ OrderServiceData: {} });
  const [loading, setLoading] = useState(false);
  const [serialNumberCode, setSerialNumberCode] = useState<string[]>([]);
  const [bulkInputValue, setBulkinputNumberValue] = useState<number>(1);


  const fetchCustomercode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrls.getCustomerCodes);
      const customerData = response.data;
      const customerMap: CustomerData = {};
      for (const customer of customerData) {
        const customerId = customer["Customer code"]; // Assuming unique identifier
        customerMap[customerId] = {
          orderNumbers: customer["Order Numbers"] || [],
          serialNumbers: customer["Serial Numbers"] || [],
        };
      }
      setCustomercode(customerData);
      setOrderNumbers(customerMap);
      setSerialNumbers(customerMap);
    } catch (error) {
      console.error("Error fetching customer codes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomercode();
  }, []);
  const fetchOrderSerialNumber = async (OrderSerialNumber: string) => {
    setLoading(true);
    try {
      const response = await axios.post(apiUrls.getOrderSerialNumber, {
        selectedValue: OrderSerialNumber,
      });
      const OrderServiceData = response.data;
      setFormValues({ ...formValues, OrderServiceData });
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log(formValues.OrderServiceData?.nextSerial);
    // console.log(formValues.OrderServiceData?.nextOrder);
  }, [formValues]);

  useEffect(() => {
    if (selectedValue) {
      fetchOrderSerialNumber(selectedValue);
    }
  }, [selectedValue]);

  // Add selectedValue as a dependency

  const exportFormData = (formData: any) => {
    // Replace this with your actual logic for exporting the form data
    console.log("Exporting form data:", formData);
  };
  const handleSubmit = async (values: any) => {
    try {
      // Gather form data into an object
      const formData = {
        IOT: values.IOT,
        BMS: values.BMS,
        Chemistry: values.Chemistry,
        Voltage: values.Voltage,
        Capacity: values.Capacity,
        YearofMfg: values.YearofMfg,
        MonthofMfg: values.MonthofMfg,
        PlantCode: values.PlantCode,
        CustomerCode: values.CustomerCode,
        OrderNumber: values.OrderNumber,
        SerialNumber: values.SerialNumber,
        bulkinputValue: bulkInputValue,
      };
  
      // Call the function to generate the serial number code
      const serialNumberCode = generateSerialNumberCode(formData, bulkInputValue);
      setSerialNumberCode(serialNumberCode);
  
      // Update the state or handle the serial number code as needed
      console.log("Generated Serial Number Code:", serialNumberCode);
  
      // Reset form values to initial state
      setFormValues(initialValues);
  
      exportFormData(formData);
    } catch (error) {
      console.error("Error occurred during form submission:", error);
    }
  };
  

  const onChangeInputNumber = (value: number | null | undefined) => {
    if (typeof value === "number" && value >= 1 && value <= 100) {
      setBulkinputNumberValue(value || 1); // Update the state with the new value or fallback to 1 if value is null or undefined
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "28px",
          }}
        >
          Serial Number Generation
        </h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form
              layout="vertical"
              style={{
                width: "100%",
              }}
              onFinish={handleSubmit}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "space-between", // Ensures equal spacing between fields
                }}
              >
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="IOT Enable?"
                    name="IOT"
                    rules={[{ required: true, message: "Please select!" }]}
                  >
                    <Select style={{ width: "100%" }} disabled={loading}>
                      <Option value="Yes">Yes</Option>
                      <Option value="NO">NO</Option>
                    </Select>
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="BMS"
                    name="BMS"
                    rules={[{ required: true, message: "Please select!" }]}
                  >
                    <Select style={{ width: "100%" }} disabled={loading}>
                      <Option value="Hardware">Hardware</Option>
                      <Option value="Software">Software</Option>
                    </Select>
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Voltage"
                    name="Voltage"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Capacity"
                    name="Capacity"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Chemistry"
                    name="Chemistry"
                    rules={[{ required: true, message: "Please select!" }]}
                  >
                    <Select style={{ width: "100%" }} disabled={loading}>
                      <Option value="NMC">NMC</Option>
                      <Option value="LPF">LPF</Option>
                    </Select>
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Customer Name"
                    name="CustomerCode"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      disabled={loading}
                      onChange={(value) => {
                        setSelectedValue(value);
                        console.log(value); // Clear SerialNumber when CustomerCode changes
                        setFieldValue("CustomerCode", value);
                      }}
                    >
                      {customercode.map((customer) => (
                        <Option
                          key={customer["Name"]}
                          value={customer["Customercode"]}
                        >
                          {customer["Name"]}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Year of MFG"
                    name="YearofMfg"
                    rules={[{ required: true, message: "Please select!" }]}
                  >
                    <Select style={{ width: "100%" }} disabled={loading}>
                      <Option value="A-23">2023</Option>
                      <Option value="B-24">2024</Option>
                      <Option value="C-25">2025</Option>
                      <Option value="D-26">2026</Option>
                      <Option value="E-27">2027</Option>
                      <Option value="F-28">2028</Option>
                    </Select>
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Month of MFG"
                    name="MonthofMfg"
                    rules={[{ required: true, message: "Please select!" }]}
                  >
                    <Select style={{ width: "100%" }} disabled={loading}>
                      <Option value="A-01">January</Option>
                      <Option value="B-02">February</Option>
                      <Option value="C-03">March</Option>
                      <Option value="D-04">April</Option>
                      <Option value="E-05">May</Option>
                      <Option value="F-06">June</Option>
                      <Option value="G-07">July</Option>
                      <Option value="H-08">August</Option>
                      <Option value="I-09">September</Option>
                      <Option value="J-10">October</Option>
                      <Option value="K-11">November</Option>
                      <Option value="L-12">December</Option>
                    </Select>
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Plant Code"
                    name="PlantCode"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Select style={{ width: "100%" }} disabled={loading}>
                      <Option value="Peenya">Peenya</Option>
                    </Select>
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Order Number"
                    name="OrderNumber"
                    rules={[{ required: true, message: "Please select!" }]}
                  >
                    <Select style={{ width: "100%" }} disabled={loading}>
                      {formValues.OrderServiceData?.nextOrder && (
                        <Option
                          key={formValues.OrderServiceData?.nextOrder}
                          value={formValues.OrderServiceData?.nextOrder}
                        >
                          {formValues.OrderServiceData.nextOrder}
                        </Option>
                      )}
                    </Select>
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Serial Number"
                    name="SerialNumber"
                    rules={[{ required: true, message: "Please select!" }]}
                  >
                    <Select style={{ width: "100%" }} disabled={loading}>
                      {formValues.OrderServiceData?.nextSerial && (
                        <Option
                          key={formValues.OrderServiceData?.nextSerial}
                          value={formValues.OrderServiceData?.nextSerial}
                        >
                          {formValues.OrderServiceData.nextSerial}
                        </Option>
                      )}
                    </Select>
                  </Form.Item>
                </span>

                <span
                  style={{ flex: "0 0 calc(50% - 10px)", paddingTop: "0px" }}
                >
                  <Form.Item label="* Bulk Input Number">
                    <InputNumber
                      min={1}
                      max={100}
                      defaultValue={1}
                      onChange={onChangeInputNumber}
                      changeOnWheel
                    />
                  </Form.Item>
                </span>
              </div>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  backgroundColor: "#44D62C",
                }}
                loading={loading}
              >
                Generate Serial Number Code
              </Button>
              {serialNumberCode && (
                <div style={{ marginTop: "20px" }}>
                  <h3>Generated Serial Number Codes:</h3>
                  {serialNumberCode.map((code, index) => (
                    <div key={index}>{code}</div>
                  ))}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormApp;
