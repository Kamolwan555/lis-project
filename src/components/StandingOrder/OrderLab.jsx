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
    item.Medical_License_Number.includes(value) ||
    item.HN.toString().includes(value) ||
    item.labtest_id.includes(value) ||
    item.status.includes(value)
);
setFilteredData(filtered);
setSearchText(value);
};

// Configuration for row selection
const rowSelection = {
selectedRowKeys,
onChange: (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
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
    columns={columns}
    dataSource={filteredData}
    rowKey="order_id"
    rowSelection={rowSelection} // Add the rowSelection property
    />
</div>
);
};

export default OrderLab;
