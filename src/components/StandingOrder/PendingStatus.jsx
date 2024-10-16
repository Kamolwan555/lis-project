import React, { useState, useEffect } from "react";
import { Table, Input, Tag } from "antd";
import "antd/dist/reset.css";
import { SearchOutlined } from "@ant-design/icons";
import sampleData from "../../assets/SampleLab.json";

const PendingStatus = () => {
const [data, setData] = useState([]);
const [searchText, setSearchText] = useState("");
const [filteredData, setFilteredData] = useState([]);
const [selectedRowKeys, setSelectedRowKeys] = useState([]); 

useEffect(() => {
const pendingData = sampleData.filter((item) => item.status === "pending");
setData(pendingData);
setFilteredData(pendingData);
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

const columns = [
{
    title: "Order ID",
    dataIndex: "order_id",
    key: "order_id",
},
{
    title: "Physician ID",
    dataIndex: "Medical_License_Number",
    key: "Medical_License_Number",
},
{
    title: "HN",
    dataIndex: "HN",
    key: "HN",
},
{
    title: "Lab Test ID",
    dataIndex: "labtest_id",
    key: "labtest_id",
},
{
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => getStatusTag(status),
},
];

const handleSearch = (value) => {
const filtered = data.filter(
    (item) =>
    item.order_id.includes(value) ||
    item.Medical_License_Number.includes(value) ||
    item.HN.toString().includes(value) ||
    item.labtest_id.includes(value) ||
    item.status.includes(value)
);
setFilteredData(filtered);
setSearchText(value);
};

const rowSelection = {
selectedRowKeys,
onChange: (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
},
};

return (
<div className="p-4">
    <Input
    placeholder="Search by Order ID, Physician ID, HN, Status"
    prefix={<SearchOutlined />}
    value={searchText}
    onChange={(e) => handleSearch(e.target.value)}
    className="mb-4"
    />
    <Table
    rowSelection={rowSelection} 
    columns={columns}
    dataSource={filteredData}
    rowKey="order_id"
    />
</div>
);
};

export default PendingStatus;
