import React, { useState } from "react";
import { Tabs } from "antd";
import PatientTab from "./PatientTab"; // นำเข้าคอมโพเนนต์ PatientTab

const MainComponent = () => {
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
        cardID: "", // เพิ่มฟิลด์ Card ID ที่นี่
    });

    const handleFormChange = (key, value) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    return (
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Patient Information" key="1">
                <PatientTab formData={formData} onFormChange={handleFormChange} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Next Tab" key="2">
                {/* แท็บถัดไป */}
            </Tabs.TabPane>
        </Tabs>
    );
};

export default MainComponent;
