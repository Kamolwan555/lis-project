import React, { useState } from "react";
import { Card, Radio, Calendar, Select, Row, Col } from "antd";

const { Option } = Select;

const Appointment = () => {
const [radioValue, setRadioValue] = useState(1); // Manage radio button state
const [firstChoiceDate, setFirstChoiceDate] = useState(null);
const [secondChoiceDate, setSecondChoiceDate] = useState(null);
const [firstChoiceTime, setFirstChoiceTime] = useState(null);
const [secondChoiceTime, setSecondChoiceTime] = useState(null);

const fixedTimeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00"];

const onFirstDateSelect = (date) => {
setFirstChoiceDate(date.format("YYYY-MM-DD"));
setFirstChoiceTime(null); // Clear previously selected time if new date is selected
};

const onSecondDateSelect = (date) => {
setSecondChoiceDate(date.format("YYYY-MM-DD"));
setSecondChoiceTime(null); // Clear previously selected time if new date is selected
};

return (
<Card
    title={
    <span style={{ fontSize: "large", fontWeight: "500" }}>Booking</span>
    }
    bordered={false}
    style={{ width: "100%", maxWidth: "100%", margin: "1px" }}
>
    {/* Radio Group */}
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
    <Radio.Group
        onChange={(e) => setRadioValue(e.target.value)}
        value={radioValue}
    >
        <Radio value={1}>Earliest date available</Radio>
        <Radio value={2}>Choose preferred date & time</Radio>
    </Radio.Group>
    </div>

    {/* Show calendars and time slots if "Choose preferred date & time" is selected */}
    {radioValue === 2 && (
    <div
        style={{ padding: "20px", display: "flex", justifyContent: "center" }}
    >
        <Row gutter={16} style={{ width: "100%", maxWidth: "800px" }}>
        {/* 1st Choice Calendar and Time Dropdown */}
        <Col span={12}>
            <Card
            title={<div style={{ textAlign: "center" }}>1st Choice</div>}
            bordered={true}
            >
            <div
                style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}
            >
                <Calendar fullscreen={false} onSelect={onFirstDateSelect} />
                {firstChoiceDate && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <h3 style={{ marginBottom: "10px" }}>
                    Select time for {firstChoiceDate}:
                    </h3>
                    <Select
                    value={firstChoiceTime}
                    style={{ width: 150 }}
                    onChange={(value) => setFirstChoiceTime(value)}
                    placeholder="Select time"
                    >
                    {fixedTimeSlots.map((time) => (
                        <Option key={time} value={time}>
                        {time}
                        </Option>
                    ))}
                    </Select>
                </div>
                )}
            </div>
            </Card>
        </Col>

        {/* 2nd Choice Calendar and Time Dropdown */}
        <Col span={12}>
            <Card
            title={<div style={{ textAlign: "center" }}>2nd Choice</div>}
            bordered={true}
            >
            <div
                style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}
            >
                <Calendar fullscreen={false} onSelect={onSecondDateSelect} />
                {secondChoiceDate && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <h3 style={{ marginBottom: "10px" }}>
                    Select time for {secondChoiceDate}:
                    </h3>
                    <Select
                    value={secondChoiceTime}
                    style={{ width: 150 }}
                    onChange={(value) => setSecondChoiceTime(value)}
                    placeholder="Select time"
                    >
                    {fixedTimeSlots.map((time) => (
                        <Option key={time} value={time}>
                        {time}
                        </Option>
                    ))}
                    </Select>
                </div>
                )}
            </div>
            </Card>
        </Col>
        </Row>
    </div>
    )}
</Card>
);
};

export default Appointment;
