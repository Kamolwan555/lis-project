import React, { useState, useEffect } from "react";
import { Table } from "antd";
import recordData from "../../assets/RecordLab.json";

const RecordTable = () => {
const [data, setData] = useState([]);

useEffect(() => {
setData(recordData);
}, []);

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
];

return (
<div style={{ padding: "20px" }}>
    <Table columns={columns} dataSource={data} rowKey="record_id" />
</div>
);
};

export default RecordTable;
