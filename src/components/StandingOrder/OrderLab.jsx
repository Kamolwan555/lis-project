import React, { useState, useEffect } from "react";
import { Table, Input, Tag } from "antd";
import "antd/dist/reset.css";
import { SearchOutlined } from "@ant-design/icons";
import sampleData from "../../assets/SampleLab.json";

const OrderLab = () => {
const [data, setData] = useState([]);
const [searchText, setSearchText] = useState("");
const [filteredData, setFilteredData] = useState([]);
const [selectedRowKeys, setSelectedRowKeys] = useState([]);

useEffect(() => {
setData(sampleData);
setFilteredData(sampleData);
}, []);

const getStatusTag = (status) => {
let color = "";
switch (status) {
    case "completed":
    color = "green";
    break;
    case "in-progress":
    color = "blue";
    break;
    case "pending":
    color = "orange";
    break;
    case "cancelled":
    color = "red";
    break;
    default:
    color = "default";
}
return <Tag color={color}>{status.toUpperCase()}</Tag>;
};

const getEmergencyTag = (emergencyCase) => {
if (emergencyCase === "urgent") {
    return <Tag color="red">URGENT</Tag>;
}
return <Tag>{emergencyCase.toUpperCase()}</Tag>; 
};

const columns = [
{
    title: "Order ID",
    dataIndex: "order_id",
    key: "order_id",
},
{
    title: "Physician ID",
    dataIndex: "medical_license_number",
    key: "medical_license_number",
},
{
    title: "Physician Name",
    dataIndex: "physician_name",
    key: "physician_name",
},
{
    title: "Card ID",
    dataIndex: "HN",
    key: "HN",
},
{
    title: "Lab Test ID",
    dataIndex: "labtest_id",
    key: "labtest_id",
},
{
    title: "Order Date",
    dataIndex: "order_date",
    key: "order_date",
},
{
    title: "Emergency Case",
    dataIndex: "emergency_case",
    key: "emergency_case",
    render: (emergencyCase) => getEmergencyTag(emergencyCase),
},
{
    title: "Status",
    dataIndex: "status",
    key: "status",
    filters: [
    { text: "Cancelled", value: "cancelled" },
    { text: "In-Progress", value: "in-progress" },
    { text: "Pending", value: "pending" },
    { text: "Completed", value: "completed" },
    ],
    onFilter: (value, record) => record.status === value,
    render: (status) => getStatusTag(status),
},
];

const handleSearch = (value) => {
const filtered = data.filter(
    (item) =>
    item.order_id.includes(value) ||
    item.medical_license_number.includes(value) ||
    item.HN.toString().includes(value) ||
    item.labtest_id.includes(value) ||
    item.status.includes(value)
);
setFilteredData(filtered);
setSearchText(value);
};


const sortedData = filteredData.sort((a, b) => {
if (a.emergency_case === "urgent" && b.emergency_case !== "urgent")
    return -1;
if (a.emergency_case !== "urgent" && b.emergency_case === "urgent")
    return 1;
return 0; 
});

const rowSelection = {
selectedRowKeys,
onChange: (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
},
};

return (
<div className="p-4">
    <Input
    placeholder="Search "
    prefix={<SearchOutlined />}
    value={searchText}
    onChange={(e) => handleSearch(e.target.value)}
    className="mb-4"
    />
    <Table
    columns={columns}
    dataSource={sortedData} 
    rowKey="order_id"
    rowSelection={rowSelection}
    />
</div>
);
};

export default OrderLab;
