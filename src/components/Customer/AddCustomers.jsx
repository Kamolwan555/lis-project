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
                            <Form.Item name="Address" label="Address"  rules={[{ required: true, message: "Please enter your address" }]}>
                                <TextArea rows={4}  />
                            </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

AddButton.propTypes = {
    onAddCustomer: PropTypes.func.isRequired,
};

export default AddButton;
