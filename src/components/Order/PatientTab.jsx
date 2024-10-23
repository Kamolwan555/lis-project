import React, { useEffect, useState } from "react";
import {
Card,
Form,
Row,
Col,
AutoComplete,
Input,
DatePicker,
TimePicker,
Typography,
Select,
Divider,
} from "antd";
import mockData from "../../assets/mockData.json";
import PropTypes from "prop-types";

const PatientTab = ({ onSubmit }) => {
const { TextArea } = Input;
const { Title } = Typography;
const [doctorOptions, setDoctorOptions] = useState([]);
const [nameOptions, setNameOptions] = useState([]);
const [hnOptions, setHnOptions] = useState([]);
const [orderId, setOrderId] = useState("");
const [formData, setFormData] = useState({
medicalLicense: "",
doctorName: "",
email: "",
phone: "",
orderDate: null,
orderTime: null,
specialNotes: "",
hn: "",
name: "",
dateOfBirth: null,
gender: "",
medicalHistory: "",
});

useEffect(() => {
const generateOrderId = () => {
    const id = `ORD-${Date.now()}`;
    setOrderId(id);
};

generateOrderId();
}, []);

const onDoctorSearch = (searchText) => {
setDoctorOptions(
    mockData
    .filter((item) =>
        item["Doctor's Name"].toLowerCase().includes(searchText.toLowerCase())
    )
    .map((item) => ({
        value: item["Doctor's Name"],
    }))
);
};

const onNameSearch = (searchText) => {
setNameOptions(
    mockData
    .filter((item) =>
        item.Name.toLowerCase().includes(searchText.toLowerCase())
    )
    .map((item) => ({
        value: item.Name,
    }))
);
};

const onHnSearch = (searchText) => {
setHnOptions(
    mockData
    .filter((item) => item.HN.toString().includes(searchText))
    .map((item) => ({
        value: item.HN,
    }))
);
};

const handleChange = (key, value) => {
setFormData((prevState) => ({ ...prevState, [key]: value }));
// Call the onSubmit function to send data on change
onSubmit({ ...formData, [key]: value });
};

return (
<>
    <Card
    title={
        <span style={{ fontSize: "large", fontWeight: "500" }}>
        Order Information
        </span>
    }
    bordered={false}
    style={{ width: "100%", maxWidth: "100%", margin: "1px" }}
    >
    <Row align="top" gutter={16}>
        <Col span={6}>
        <Title
            level={4}
            style={{ margin: 0, fontSize: "16px", fontWeight: "normal" }}
        >
            Physician Information
        </Title>
        </Col>
        <Col span={18}>
        <Form
            name="wrap"
            colon={false}
            layout="horizontal"
            style={{ width: "100%" }}
        >
            <Form.Item
            label="Order ID"
            name="Order ID"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: "10px" }}
            >
            <Input value={orderId} readOnly />
            </Form.Item>
            <Row gutter={50}>
            <Col span={12}>
                <Form.Item
                label="Medical License Number"
                name="Medical License Number"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
                >
                <Input
                    onChange={(e) =>
                    handleChange("medicalLicense", e.target.value)
                    }
                />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                label="Doctor's Name"
                name="Doctor's Name"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
                >
                <AutoComplete
                    options={doctorOptions}
                    onSearch={onDoctorSearch}
                    onChange={(value) => handleChange("doctorName", value)}
                />
                </Form.Item>
            </Col>
            </Row>
            <Row gutter={50}>
            <Col span={12}>
                <Form.Item
                label="Email Address"
                name="Email Address"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
                >
                <Input
                    onChange={(e) => handleChange("email", e.target.value)}
                />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                label="Phone Number"
                name="Phone Number"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
                >
                <Input
                    onChange={(e) => handleChange("phone", e.target.value)}
                />
                </Form.Item>
            </Col>
            </Row>
            <Row gutter={50}>
            <Col span={12}>
                <Form.Item
                label="Date of Order"
                name="Date of Order"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
                >
                <DatePicker
                    style={{ width: "100%" }}
                    onChange={(date) => handleChange("orderDate", date)}
                />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                label="Time of Order"
                name="Time of Order"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
                >
                <TimePicker
                    style={{ width: "100%" }}
                    onChange={(time) => handleChange("orderTime", time)}
                />
                </Form.Item>
            </Col>
            </Row>
            <Form.Item
            label="Special Notes"
            name="Special Notes"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: "10px" }}
            >
            <TextArea
                rows={4}
                onChange={(e) => handleChange("specialNotes", e.target.value)}
            />
            </Form.Item>
            {/* Removed submit button */}
        </Form>
        </Col>
    </Row>
    </Card>

    <Card
    title={
        <span style={{ fontSize: "large", fontWeight: "500" }}>
        Additional Patient Information
        </span>
    }
    bordered={false}
    style={{ width: "100%", maxWidth: "100%", marginTop: "25px" }}
    >
    <Row align="top" gutter={16}>
        <Col span={6}>
        <Title
            level={4}
            style={{ margin: 0, fontSize: "16px", fontWeight: "normal" }}
        >
            Personal Information
        </Title>
        </Col>
        <Col span={18}>
        <Form
            name="wrap"
            colon={false}
            layout="horizontal"
            style={{ width: "100%" }}
        >
            <Row gutter={50}>
            <Col span={12}>
                <Form.Item
                label="Card ID"
                name="Card ID"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
                >
                <AutoComplete
                    options={hnOptions}
                    onSearch={onHnSearch}
                    onChange={(value) => handleChange("hn", value)}
                />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                label="Name"
                name="Name"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
                >
                <AutoComplete
                    options={nameOptions}
                    onSearch={onNameSearch}
                    onChange={(value) => handleChange("name", value)}
                />
                </Form.Item>
            </Col>
            </Row>
            <Row gutter={50}>
            <Col span={12}>
                <Form.Item
                label="Date of Birth"
                name="Date of Birth"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
                >
                <DatePicker
                    style={{ width: "100%" }}
                    onChange={(date) => handleChange("dateOfBirth", date)}
                />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                label="Gender"
                name="Gender"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
                >
                <Select onChange={(value) => handleChange("gender", value)}>
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                </Select>
                </Form.Item>
            </Col>
            </Row>
        </Form>
        </Col>
    </Row>

    <Divider />

    <Row align="top" gutter={16}>
        <Col span={6}>
        <Title
            level={4}
            style={{ margin: 0, fontSize: "16px", fontWeight: "normal" }}
        >
            Health Information
        </Title>
        </Col>
        <Col span={18}>
        <Form
            name="wrap"
            colon={false}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            style={{ width: "100%" }}
        >
            <Form.Item
            label="Medical History"
            name="Medical History"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: "10px" }}
            >
            <TextArea
                rows={4}
                onChange={(e) =>
                handleChange("medicalHistory", e.target.value)
                }
            />
            </Form.Item>
        </Form>
        </Col>
    </Row>
    </Card>
</>
);
};

PatientTab.propTypes = {
onSubmit: PropTypes.func.isRequired,
};

export default PatientTab;
