import React, { useState } from "react";
import { Button, Drawer, Form, Input, DatePicker, Select, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import axios from "axios"; // import axios

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

    const onSubmit = async (values) => {
        const createMemberr = {
            card_id: values['Card ID'],
            me_firstname: values.Name.split(" ")[0],
            me_lastname: values.Name.split(" ")[1],
            me_birthday: values['Date of Birth'] ? values['Date of Birth'].format('YYYY-MM-DD') : null, // แปลง date ให้เป็น string
            me_gender: values.Gender,
            me_address: values.Address,
            me_phone: values['Contact Information'],
            me_prefix: values['Prefix'] || "mr.",  // ตั้งค่า default
            me_religion: values['Religion'] || "Buddhist",  // เพิ่มฟิลด์ religion
            me_ethnicity: values['Ethnicity'] || "Thai",
            me_nationality: values['Nationality'] || "Thai",
            me_status: values['Status'] || "single",
            me_blood: values['Blood'] || "A",
            me_subdistric: values['Subdistric'] || null,
            me_distric: values['Distric'] || null,
            me_province: values['Province'] || null,
            me_postalcode: values['Postalcode'] || null,
            me_email: values['Email'] || null,
            me_drug: values['Drug'] || null,
            me_disease: values['Disease'] || null,
        };
        console.log(createMemberr)
    
        try {
            const response = await axios.post("http://localhost:3000/TechMedi/createMemberr", createMemberr);
            console.log('Response:', response);  // เพิ่ม log ตรงนี้
            if (response.status === 201) {
                onAddCustomer(response.data.data); 
                onClose(); 
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
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
                    <Form.Item
                        name="Card ID"
                        label="Card ID"
                        rules={[{ required: true, message: "Please enter Card ID" }]}
                    >
                        <Input placeholder="Please enter Card ID" />
                    </Form.Item>
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
                    <Form.Item
                        name="Address"
                        label="Address"
                        rules={[{ required: true, message: "Please enter your address" }]}
                    >
                        <TextArea rows={4} />
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
