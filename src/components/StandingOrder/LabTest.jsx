import React, { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";
import "antd/dist/reset.css";
import sampleData from "../../assets/SampleLab.json";

const Labtest = () => {
const [data, setData] = useState([]);
const [editingRowKey, setEditingRowKey] = useState(null);
const [editedRow, setEditedRow] = useState({});

useEffect(() => {
setData(sampleData);
}, []);

const handleEditClick = (record) => {
setEditingRowKey(record.order_id);
setEditedRow(record);
};

const handleSaveClick = () => {
const updatedData = data.map((item) =>
    item.order_id === editingRowKey ? editedRow : item
);
setData(updatedData);
setEditingRowKey(null);
};

const handleInputChange = (e, field) => {
setEditedRow({ ...editedRow, [field]: e.target.value });
};

const columns = [
{
    title: "Lab Test ID",
    dataIndex: "labtest_id",
    key: "labtest_id",
    render: (text, record) =>
    editingRowKey === record.order_id ? (
        <Input
        value={editedRow.labtest_id}
        onChange={(e) => handleInputChange(e, "labtest_id")}
        />
    ) : (
        text
    ),
},
{
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) =>
    editingRowKey === record.order_id ? (
        <Input
        value={editedRow.name}
        onChange={(e) => handleInputChange(e, "name")}
        />
    ) : (
        text
    ),
},
{
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
    render: (text, record) =>
    editingRowKey === record.order_id ? (
        <Input
        value={editedRow.unit}
        onChange={(e) => handleInputChange(e, "unit")}
        />
    ) : (
        text
    ),
},
{
    title: "Default",
    dataIndex: "default",
    key: "default",
    render: (text, record) =>
    editingRowKey === record.order_id ? (
        <Input
        value={editedRow.default}
        onChange={(e) => handleInputChange(e, "default")}
        />
    ) : (
        text
    ),
},
{
    title: "Price", 
    dataIndex: "price",
    key: "price",
    render: (text, record) =>
    editingRowKey === record.order_id ? (
        <Input
        value={editedRow.price}
        onChange={(e) => handleInputChange(e, "price")}
        />
    ) : (
        `฿${parseFloat(text).toFixed(2)}` 
    ),
},
{
    title: "Action",
    key: "action",
    render: (_, record) =>
    editingRowKey === record.order_id ? (
        <Button type="primary" onClick={handleSaveClick}>
        Save
        </Button>
    ) : (
        <Button onClick={() => handleEditClick(record)}>Edit</Button>
    ),
},
];

return (
<div className="p-4">
    <Table columns={columns} dataSource={data} rowKey="order_id" />
</div>
);
};

export default Labtest;
