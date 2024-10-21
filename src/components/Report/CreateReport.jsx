import React, { useEffect, useState } from "react";
import { Table, Input, Button, Modal, message } from "antd";
import data from "../../assets/ReportLab.json";

const ReportTable = () => {
const [reportData, setReportData] = useState([]);
const [searchText, setSearchText] = useState("");
const [filteredData, setFilteredData] = useState([]);
const [isModalVisible, setIsModalVisible] = useState(false);
const [currentRecord, setCurrentRecord] = useState(null);
const [editData, setEditData] = useState({});

useEffect(() => {
setReportData(data);
setFilteredData(data);
}, []);

useEffect(() => {
const filtered = reportData.filter(
    (item) =>
    item.patient_name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.doctor_name.toLowerCase().includes(searchText.toLowerCase())
);
setFilteredData(filtered);
}, [searchText, reportData]);

const handleEdit = (record) => {
setCurrentRecord(record);
setEditData({
    ...record,
});
setIsModalVisible(true);
};

const handleReport = (record) => {

message.info(`Generating report for Report ID: ${record.report_id}`);
};

const handleOk = () => {

const updatedData = reportData.map((item) =>
    item.report_id === currentRecord.report_id
    ? { ...item, ...editData }
    : item
);

setReportData(updatedData);
setFilteredData(
    updatedData.filter(
    (item) =>
        item.patient_name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.doctor_name.toLowerCase().includes(searchText.toLowerCase())
    )
);
setIsModalVisible(false);
message.success(
    `Report ID ${currentRecord.report_id} updated successfully!`
);
};

const handleCancel = () => {
setIsModalVisible(false);
};

const handleChange = (e) => {
const { name, value } = e.target;
setEditData((prevData) => ({
    ...prevData,
    [name]: value,
}));
};

const columns = [
{
    title: "Report ID",
    dataIndex: "report_id",
    key: "report_id",
},
{
    title: "ACP ID",
    dataIndex: "labaccept_id",
    key: "labaccept_id",
},
{
    title: "Patient Number",
    dataIndex: "employee_id",
    key: "employee_id",
},
{
    title: "Patient Name",
    dataIndex: "patient_name",
    key: "patient_name",
},
{
    title: "Result",
    dataIndex: "result",
    key: "result",
},
{
    title: "Doctor Name",
    dataIndex: "doctor_name",
    key: "doctor_name",
},
{
    title: "Remarks",
    dataIndex: "remarks",
    key: "remarks",
},
{
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
},
{
    title: "Updated At",
    dataIndex: "updated_at",
    key: "updated_at",
},
{
    title: "Actions",
    key: "actions",
    render: (text, record) => (
    <>
        <Button
        onClick={() => handleEdit(record)}
        type="primary"
        style={{ marginRight: 8 }}
        >
        Edit
        </Button>
        <Button onClick={() => handleReport(record)} type="default">
        Report
        </Button>
    </>
    ),
},
];

return (
<div style={{ padding: "20px" }}>
    <Input
    placeholder="Search by Patient or Doctor Name"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    style={{ marginBottom: "20px", width: "300px" }}
    />
    <Table
    dataSource={filteredData}
    columns={columns}
    rowKey="report_id"
    pagination={{ pageSize: 10 }}
    />
    <Modal
    title="Edit Report"
    visible={isModalVisible}
    onOk={handleOk}
    onCancel={handleCancel}
    >
    {currentRecord && (
        <>
        <div>
            <label>Patient Name:</label>
            <Input
            name="patient_name"
            value={editData.patient_name}
            onChange={handleChange}
            style={{ marginTop: "10px", marginBottom: "10px" }}
            />
        </div>
        <div>
            <label>Hospital Number:</label>
            <Input
            name="hospital_number"
            value={editData.hospital_number}
            onChange={handleChange}
            style={{ marginTop: "10px", marginBottom: "10px" }}
            />
        </div>
        <div>
            <label>Test Date:</label>
            <Input
            name="test_date"
            value={editData.test_date}
            onChange={handleChange}
            style={{ marginTop: "10px", marginBottom: "10px" }}
            />
        </div>
        <div>
            <label>Test Type:</label>
            <Input
            name="test_type"
            value={editData.test_type}
            onChange={handleChange}
            style={{ marginTop: "10px", marginBottom: "10px" }}
            />
        </div>
        <div>
            <label>Result:</label>
            <Input
            name="result"
            value={editData.result}
            onChange={handleChange}
            style={{ marginTop: "10px", marginBottom: "10px" }}
            />
        </div>
        <div>
            <label>Doctor Name:</label>
            <Input
            name="doctor_name"
            value={editData.doctor_name}
            onChange={handleChange}
            style={{ marginTop: "10px", marginBottom: "10px" }}
            />
        </div>
        <div>
            <label>Remarks:</label>
            <Input
            name="remarks"
            value={editData.remarks}
            onChange={handleChange}
            style={{ marginTop: "10px", marginBottom: "10px" }}
            />
        </div>
        </>
    )}
    </Modal>
</div>
);
};

export default ReportTable;
