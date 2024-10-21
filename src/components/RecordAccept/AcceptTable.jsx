import React, { useState, useEffect } from "react";
import { Table, Drawer, Button, notification, Modal, Input } from "antd";
import recordData from "../../assets/RecordLab.json";

const AcceptTable = () => {
const [data, setData] = useState([]);
const [visible, setVisible] = useState(false);
const [selectedRecord, setSelectedRecord] = useState(null);
const [isModalVisible, setIsModalVisible] = useState(false); // สถานะสำหรับ Modal
const [doctorName, setDoctorName] = useState(""); // ค่าชื่อแพทย์
const [doctorId, setDoctorId] = useState(""); // ค่ารหัสแพทย์

useEffect(() => {
setData(recordData);
}, []);

const showDrawer = (record) => {
setSelectedRecord(record);
setVisible(true);
};

const onClose = () => {
setVisible(false);
setSelectedRecord(null);
};

const handleAccept = (record) => {
console.log("Accepted record:", record);
};

const handleConfirm = () => {
setIsModalVisible(true); // เปิด Modal เมื่อกด Confirm
};

const handleOk = () => {
// แสดงข้อความยืนยันที่นี่
notification.success({
    message: "Confirmation Successful",
    description: `You have confirmed the record ID: ${selectedRecord.record_id} with Doctor: ${doctorName} (ID: ${doctorId})`,
});
setIsModalVisible(false); // ปิด Modal
onClose(); // ปิด Drawer
// ทำการจัดการอื่นๆ ที่คุณต้องการที่นี่ เช่น บันทึกข้อมูลลงฐานข้อมูล
};

const handleCancel = () => {
setIsModalVisible(false); // ปิด Modal เมื่อกด Cancel
};

const columns = [
{
    title: "Record ID",
    dataIndex: "record_id",
    key: "record_id",
},
{
    title: "Patient ID",
    dataIndex: "patient_id",
    key: "patient_id",
},
{
    title: "Test ID",
    dataIndex: "test_id",
    key: "test_id",
},
{
    title: "Test Name",
    dataIndex: "test_name",
    key: "test_name",
},
{
    title: "Result",
    dataIndex: "result",
    key: "result",
},
{
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
},
{
    title: "Reference Range",
    dataIndex: "reference_range",
    key: "reference_range",
},
{
    title: "Date Tested",
    dataIndex: "date_tested",
    key: "date_tested",
},
{
    title: "Status",
    dataIndex: "status",
    key: "status",
},
{
    title: "Action",
    key: "action",
    render: (_, record) => (
    <Button type="primary" onClick={() => handleAccept(record)}>
        Accept
    </Button>
    ),
},
];

return (
<div style={{ padding: "20px" }}>
    <Table
    columns={columns}
    dataSource={data}
    rowKey="record_id"
    onRow={(record) => ({
        onClick: () => showDrawer(record),
    })}
    />
    <Drawer
    title="Record Details"
    placement="right"
    onClose={onClose}
    visible={visible}
    width={500}
    >
    {selectedRecord && (
        <div>
        <p style={{ margin: "10px 0" }}>
            <strong>Record ID:</strong> {selectedRecord.record_id}
        </p>
        <p style={{ margin: "10px 0" }}>
            <strong>Patient ID:</strong> {selectedRecord.patient_id}
        </p>
        <p style={{ margin: "10px 0" }}>
            <strong>Test ID:</strong> {selectedRecord.test_id}
        </p>
        <p style={{ margin: "10px 0" }}>
            <strong>Test Name:</strong> {selectedRecord.test_name}
        </p>
        <p style={{ margin: "10px 0" }}>
            <strong>Result:</strong> {selectedRecord.result}
        </p>
        <p style={{ margin: "10px 0" }}>
            <strong>Unit:</strong> {selectedRecord.unit}
        </p>
        <p style={{ margin: "10px 0" }}>
            <strong>Reference Range:</strong> {selectedRecord.reference_range}
        </p>
        <p style={{ margin: "10px 0" }}>
            <strong>Date Tested:</strong> {selectedRecord.date_tested}
        </p>
        <p style={{ margin: "10px 0" }}>
            <strong>Status:</strong> {selectedRecord.status}
        </p>
        </div>
    )}
    <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Button onClick={onClose} style={{ marginRight: 8 }}>
        Cancel
        </Button>
        <Button type="primary" onClick={handleConfirm}>
        Confirm
        </Button>
    </div>
    </Drawer>

    <Modal
    title="Accept Record"
    visible={isModalVisible}
    onOk={handleOk}
    onCancel={handleCancel}
    >
    <Input
        placeholder="Doctor's Name"
        value={doctorName}
        onChange={(e) => setDoctorName(e.target.value)}
    />
    <Input
        placeholder="Doctor's ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        style={{ marginTop: "10px" }}
    />
    </Modal>
</div>
);
};

export default AcceptTable;
