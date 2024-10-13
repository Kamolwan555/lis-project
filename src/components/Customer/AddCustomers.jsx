import React, { useState } from "react";
import { Button, Drawer, Form, Input, DatePicker, Select, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const { Option } = Select;
const { TextArea } = Input;

const AddButton = ({ onAddCustomer }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
        form.resetFields();
    };
    
    const onSubmit = (values) => {
        const newCustomer = {
            HN: values.HN,
            'Customer ID': values['Customer ID'], 
            Name: values.Name,
            'Date of Birth': values['Date of Birth'], 
            Gender: values.Gender,
            'Contact Information': values['Contact Information'], 
            'Requested Test': values['Requested Test'], 
            'Sample Type': values['Sample Type'], 
            'Date of Sample Collection': values['Date of Sample Collection'], 
            'Test Results': values['Test Results'],
            'Date of Test Completion': values['Date of Test Completion'], 
            "Doctor's Name": values["Doctor's Name"], 
            'Lab Technician': values['Lab Technician'], 
            Remarks: values.Remarks,
        };
    
        onAddCustomer(newCustomer);
        onClose();
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
            <PlusOutlined />
                Add Customer
            </Button>
            <Drawer
                title={
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>Add Customer</span>
                        <Button type="primary" htmlType="submit" form="add-customer-form">
                            Submit
                        </Button>
                    </div>
                }
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form layout="vertical" form={form} id="add-customer-form" onFinish={onSubmit}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="HN"
                                label="HN"
                                rules={[{ required: true, message: "Please enter HN" }]}
                            >
                                <Input placeholder="Please enter HN" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="Customer ID"
                                label="Customer ID"
                                rules={[{ required: true, message: "Please enter Customer ID" }]}
                            >
                                <Input placeholder="Please enter Customer ID" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="Name"
                                label="Name"
                                rules={[{ required: true, message: "Please enter name" }]}
                            >
                                <Input placeholder="Please enter name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="Date of Birth"
                                label="Date of Birth"
                                rules={[{ required: true, message: "Please select date of birth" }]}
                            >
                                <DatePicker style={{ width: "100%" }} placeholder="Select date" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="Gender"
                                label="Gender"
                                rules={[{ required: true, message: "Please select gender" }]}
                            >
                                <Select placeholder="Please select gender">
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="Contact Information"
                                label="Contact Information"
                                rules={[{ required: true, message: "Please enter contact information" }]}
                            >
                                <Input placeholder="Please enter contact information" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="RequestedTest"
                                label="Requested Test"
                                rules={[{ required: true, message: "Please enter requested test" }]}
                            >
                                <Input placeholder="Please enter requested test" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="Sample Type"
                                label="Sample Type"
                                rules={[{ required: true, message: "Please enter sample type" }]}
                            >
                                <Input placeholder="Please enter sample type" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="Date of Sample Collection"
                                label="Date of Sample Collection"
                                rules={[{ required: true, message: "Please select date of sample collection" }]}
                            >
                                <DatePicker style={{ width: "100%" }} placeholder="Select date" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="Test Results"
                                label="Test Results"
                                rules={[{ required: true, message: "Please enter test results" }]}
                            >
                                <Input placeholder="Please enter test results" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="Date of Test Completion"
                                label="Date of Test Completion"
                                rules={[{ required: true, message: "Please select date of test completion" }]}
                            >
                                <DatePicker style={{ width: "100%" }} placeholder="Select date" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="Doctor's Name"
                                label="Doctor's Name"
                                rules={[{ required: true, message: "Please enter doctor's name" }]}
                            >
                                <Input placeholder="Please enter doctor's name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="Lab Technician"
                                label="Lab Technician"
                                rules={[{ required: true, message: "Please enter lab technician name" }]}
                            >
                                <Input placeholder="Please enter lab technician name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="Remarks" label="Remarks">
                                <TextArea rows={4} placeholder="Please enter remarks" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

AddButton.propTypes = {
    onAddCustomer: PropTypes.func.isRequired,
};

export default AddButton;
