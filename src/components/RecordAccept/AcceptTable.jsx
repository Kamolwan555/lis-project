import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import recordData from "../../assets/RecordLab.json";

const AcceptTable = () => {
const [data, setData] = useState([]);
const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedRecord, setSelectedRecord] = useState(null);
const [doctorName, setDoctorName] = useState("");
const [doctorId, setDoctorId] = useState("");

useEffect(() => {
setData(recordData);
}, []);

const handleAccept = (record) => {
setSelectedRecord(record);
setIsModalVisible(true);
};

const handleOk = () => {
// Update the status or any other actions needed here
const updatedData = data.map((item) => {
    if (item.record_id === selectedRecord.record_id) {
    return {
        ...item,
        status: "Accepted",
        doctor_name: doctorName,
        doctor_id: doctorId,
    };
    }
    return item;
});
setData(updatedData);
setIsModalVisible(false);
setDoctorName("");
setDoctorId("");
};

const handleCancel = () => {
setIsModalVisible(false);
setDoctorName("");
setDoctorId("");
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
    <Table columns={columns} dataSource={data} rowKey="record_id" />
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
