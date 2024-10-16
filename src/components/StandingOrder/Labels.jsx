import React from "react";
import {
Card,
Row,
Col,
Form,
Input,
DatePicker,
TimePicker,
Typography,
Button,
} from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const { Title } = Typography;

const Labels = ({ orderId, handleChange }) => {
const handlePrint = () => {
console.log("Print button clicked");
};

return (
<Card
    title={
    <span style={{ fontSize: "large", fontWeight: "500" }}>
        Label Print
    </span>
    }
    bordered={false}
    style={{
    width: "100%",
    maxWidth: "100%",
    margin: "1px",
    position: "relative",
    minHeight: "500px",
    }}
>
    <Button
    type="text"
    icon={<PrinterOutlined />}
    onClick={handlePrint}
    style={{
        position: "absolute",
        top: "16px",
        right: "16px",
        padding: 0,
        border: "none",
        background: "transparent",
        transition: "background-color 0.3s",
    }}
    onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.1)")
    }
    onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
    }
    />

    <Row align="top" gutter={16}>
    <Col span={6}>
        <Title
        level={4}
        style={{ margin: 0, fontSize: "16px", fontWeight: "normal" }}
        >
        Label Information
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
            label="Examining Doctor"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: "10px" }}
        >
            <Input value={orderId} readOnly />
        </Form.Item>

        <Row gutter={50}>
            <Col span={12}>
            <Form.Item
                label="Specimen Type"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
            >
                <Input
                onChange={(e) =>
                    handleChange("specimenType", e.target.value)
                }
                />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                label="Preservative"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
            >
                <Input
                onChange={(e) =>
                    handleChange("preservative", e.target.value)
                }
                />
            </Form.Item>
            </Col>
        </Row>

        <Row gutter={50}>
            <Col span={12}>
            <Form.Item
                label="Specimen Code"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
            >
                <Input
                onChange={(e) =>
                    handleChange("specimenCode", e.target.value)
                }
                />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                label="Specimen Category"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: "10px" }}
            >
                <Input
                onChange={(e) =>
                    handleChange("specimenCategory", e.target.value)
                }
                />
            </Form.Item>
            </Col>
        </Row>

        <Form.Item
            label="Preservative Quantity"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: "10px" }}
        >
            <Input
            onChange={(e) =>
                handleChange("preservativeQuantity", e.target.value)
            }
            />
        </Form.Item>

        <Row gutter={50}>
            <Col span={12}>
            <Form.Item
                label="Date"
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
                label="Time"
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

        <Row gutter={50} style={{ marginBottom: "30px" }}></Row>
        </Form>
    </Col>
    </Row>
</Card>
);
};

Labels.propTypes = {
orderId: PropTypes.string.isRequired,
handleChange: PropTypes.func.isRequired,
};

export default Labels;
