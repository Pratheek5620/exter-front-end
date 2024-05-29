"use client";
import React, { useState, useEffect } from "react";
import { Button, Form, Select, Input, DatePicker, InputNumber } from "antd";
import { Formik } from "formik";
import axios from "axios";
import { apiUrls } from "../utils/apiEndpoints";


const { Option } = Select;

const initialValues = {
  BrandName: "",
  CustomerName: "",
  Voltage: "",
  Capacity: "",
  Chemistry: "",
  CellType: "",
  ReceivedDate: "",
  NumberOfBatteries: 1,
};

const BatteryForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [customerCodes, setCustomerCodes] = useState<string[]>([]);

  const fetchCustomerCodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrls.getCustomerCodes); // Using the correct API endpoint
      setCustomerCodes(response.data);
    } catch (error) {
      console.error("Error fetching customer codes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerCodes();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const formData = {
        ...values,
        ReceivedDate: values.ReceivedDate.format("YYYY-MM-DD"), // Format date
      };

      console.log("Form data submitted:", formData);
      // Perform the API call to submit form data
    } catch (error) {
      console.error("Error occurred during form submission:", error);
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
          Battery Service Form
        </h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
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
                  justifyContent: "space-between",
                }}
              >
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Brand Name"
                    name="BrandName"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Customer Name"
                    name="CustomerName"
                    rules={[{ required: true, message: "Please select!" }]}
                  >
                    <Select style={{ width: "100%" }} disabled={loading}>
                      {customerCodes.map((code) => (
                        <Option key={code} value={code}>
                          {code}
                        </Option>
                      ))}
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
                    <Select style={{ width: "100%" }}>
                      <Option value="NMC">NMC</Option>
                      <Option value="LPF">LPF</Option>
                    </Select>
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Cell Type"
                    name="CellType"
                    rules={[{ required: true, message: "Please select!" }]}
                  >
                    <Select style={{ width: "100%" }}>
                      <Option value="Type1">Type 1</Option>
                      <Option value="Type2">Type 2</Option>
                    </Select>
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Received Date"
                    name="ReceivedDate"
                    rules={[{ required: true, message: "Please select!" }]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      disabled={loading}
                      onChange={(date) => setFieldValue("ReceivedDate", date)}
                    />
                  </Form.Item>
                </span>
                <span style={{ flex: "0 0 calc(50% - 10px)" }}>
                  <Form.Item
                    label="Number of Batteries"
                    name="NumberOfBatteries"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <InputNumber
                      min={1}
                      max={100}
                      defaultValue={1}
                      style={{ width: "100%" }}
                      onChange={(value) => setFieldValue("NumberOfBatteries", value)}
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
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BatteryForm;
