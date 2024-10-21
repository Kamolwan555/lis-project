import React, { useEffect, useState } from "react";
import {
Card,
Form,
DatePicker,
TimePicker,
Divider,
Button,
message,
Input,
} from "antd";
import { useNavigate } from "react-router-dom";

const CreateAppointment = () => {
const navigate = useNavigate();
const [orderId, setOrderId] = useState("");
const [appointmentId, setAppointmentId] = useState("");
const [memberId, setMemberId] = useState("");

useEffect(() => {
const generateOrderId = () => {
    const id = `ORD-${Date.now()}`;
    setOrderId(id);
};

const generateAppointmentId = () => {
    const id = `APT-${Math.floor(Math.random() * 100000)}`;
    setAppointmentId(id);
};

const generateMemberId = () => {
    const id = `MEM-${Math.floor(Math.random() * 100000)}`; 
    setMemberId(id);
};

generateOrderId();
generateAppointmentId();
generateMemberId(); 
}, []);

const onFinish = (values) => {
if (!values.preferredDate || !values.time) {
    message.error("Please select both date and time.");
    return;
}

console.log("Success:", { ...values, orderId, appointmentId, memberId });
message.success("Appointment successfully created!");
navigate("/dashboard");
};

const onFinishFailed = (errorInfo) => {
console.log("Failed:", errorInfo);
message.error("Please fill out all required fields.");
};

return (
<Card style={{ width: "100%" }}>
    <Form
    layout="vertical"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    >
    <Form.Item
        label="Order ID"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ marginBottom: "10px" }}
    >
        <Input value={orderId} readOnly />
    </Form.Item>

    <Form.Item
        label="Appointment ID"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ marginBottom: "10px" }}
    >
        <Input value={appointmentId} readOnly />
    </Form.Item>

    <Form.Item
        label="Member ID" 
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ marginBottom: "10px" }}
    >
        <Input
        value={memberId} 
        readOnly 
        />
    </Form.Item>

    <Divider />

    <Form.Item
        label="Preferred Date"
        name="preferredDate"
        rules={[{ required: true, message: "Please select a date!" }]}
    >
        <DatePicker style={{ width: "100%" }} />
    </Form.Item>

    <Form.Item
        label="Preferred Time"
        name="time"
        rules={[{ required: true, message: "Please select a time!" }]}
    >
        <TimePicker style={{ width: "100%" }} />
    </Form.Item>

    <div
        style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "30px",
        }}
    >
        <Form.Item>
        <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#2563eb" }}
        >
            Save
        </Button>
        </Form.Item>
    </div>
    </Form>
</Card>
);
};

export default CreateAppointment;
