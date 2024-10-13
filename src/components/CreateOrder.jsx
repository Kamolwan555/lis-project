import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd"; 
import PatientTab from "./Order/PatientTab";
import SelectionTab from "./Order/SelectionTab";
import Appointment from "./Order/AppointmentTab";

const TabCard = ({ isActive, onClick, children, disabled }) => (
<div
onClick={!disabled ? onClick : null}
style={{
    padding: "10px",
    margin: "5px",
    borderRadius: "5px",
    cursor: disabled ? "not-allowed" : "pointer",
    backgroundColor: isActive ? "#2563eb" : "#f3f4f6",
    color: isActive ? "white" : "#6b7280",
    fontSize: "14px",
    fontWeight: isActive ? "normal" : "300",
    flex: 1,
    textAlign: "center",
    opacity: disabled ? 0.5 : 1,
    transition: "background-color 0.3s",
}}
>
{children}
</div>
);

TabCard.propTypes = {
isActive: PropTypes.bool.isRequired,
onClick: PropTypes.func.isRequired,
children: PropTypes.node.isRequired,
disabled: PropTypes.bool.isRequired,
};

const CreateOrder = () => {
const navigate = useNavigate();

const tabs = [
"Patient Information",
"Test Selection",
"Appointment Information",
];

const [activeTabIndex, setActiveTabIndex] = useState(0);
const [patientInfo, setPatientInfo] = useState({});
const [selectedTests, setSelectedTests] = useState([]);
const [appointmentInfo, setAppointmentInfo] = useState({});

const handleNext = () => {
if (activeTabIndex < tabs.length - 1) {
    setActiveTabIndex((prev) => prev + 1);
}
};

const handleBack = () => {
if (activeTabIndex > 0) {
    setActiveTabIndex((prev) => prev - 1);
}
};

const handleFormChange = (tabName, data) => {
switch (tabName) {
    case "patientInfo":
    setPatientInfo(data);
    break;
    case "testSelect":
    setSelectedTests(data);
    break;
    case "appointmentInfo":
    setAppointmentInfo(data);
    break;
    default:
    break;
}
};

const handleFinish = () => {
console.log("Finish button clicked", {
    patientInfo,
    selectedTests,
    appointmentInfo,
});

navigate("/CreateSuccess");
};

const tabComponents = [
<PatientTab
    key="patientInfo"
    onFormChange={(data) => handleFormChange("patientInfo", data)}
    initialData={patientInfo}
/>,
<SelectionTab
    key="testSelect"
    onFormChange={(data) => handleFormChange("testSelect", data)}
    initialData={selectedTests}
/>,
<Appointment
    key="appointmentInfo"
    onFormChange={(data) => handleFormChange("appointmentInfo", data)}
    initialData={appointmentInfo}
/>,
];

return (
<div>
    {/* Header Tab */}
    <div style={{ display: "flex" }}>
    {tabs.map((tab, index) => (
        <TabCard
        key={index}
        isActive={index === activeTabIndex}
        onClick={() => setActiveTabIndex(index)}
        disabled={index !== activeTabIndex}
        >
        {tab}
        </TabCard>
    ))}
    </div>

    <div style={{ marginTop: "20px" }}>{tabComponents[activeTabIndex]}</div>

    <div
    style={{
        marginTop: "30px",
        margin: "30px",
        display: "flex",
        justifyContent: "flex-end",
    }}
    >
    <Space>
        {activeTabIndex > 0 && (
        <Button
            onClick={handleBack}
            style={{
            padding: "5px 30px",
            cursor: "pointer",
            marginBottom: "30px",
            marginTop: "30px",
            marginRight: "5px",
            }}
        >
            Previous
        </Button>
        )}

        {activeTabIndex < tabs.length - 1 && (
        <Button
            type="primary"
            onClick={handleNext}
            style={{
            padding: "5px 30px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "30px",
            marginTop: "30px",
            marginRight: "5px",
            }}
        >
            Next
        </Button>
        )}

        {activeTabIndex === tabs.length - 1 && (
        <Button
            type="primary"
            onClick={handleFinish}
            style={{
            padding: "5px 30px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "30px",
            marginTop: "30px",
            marginRight: "5px",
            }}
        >
            Done
        </Button>
        )}
    </Space>
    </div>
</div>
);
};

export default CreateOrder;
