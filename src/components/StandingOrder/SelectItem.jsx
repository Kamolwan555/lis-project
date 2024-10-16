import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import LabItems from "../../assets/LabItems.json";

const SelectItem = () => {
const [data, setData] = useState([]);
const [searchText, setSearchText] = useState("");
const [selectedRowKeys, setSelectedRowKeys] = useState([]); 

useEffect(() => {
setData(LabItems);
}, []);

const handleNumberChange = (value, record) => {
const updatedData = data.map((item) =>
    item.id === record.id
    ? { ...item, number: value, total: value * item.price }
    : item
);
setData(updatedData);
};

const filteredData = data.filter((item) =>
item.name.toLowerCase().includes(searchText.toLowerCase())
);

const columns = [
{
    title: "ID",
    dataIndex: "id",
    key: "id",
},
{
    title: "Name",
    dataIndex: "name",
    key: "name",
},
{
    title: "Type",
    dataIndex: "type",
    key: "type",
},
{
    title: "Date Updated",
    dataIndex: "dateup",
    key: "dateup",
},
{
    title: "Expiration Date",
    dataIndex: "expdate",
    key: "expdate",
},
{
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
},
{
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => <span>{text} THB</span>,
},
{
    title: "Number",
    key: "number",
    render: (text, record) => (
    <Input
        type="number"
        min={0}
        value={record.number || ""}
        onChange={(e) => handleNumberChange(e.target.value, record)}
        style={{ width: "80px" }} 
    />
    ),
},
{
    title: "Total",
    key: "total",
    render: (text, record) => (
    <span>{(record.number || 0) * record.price} THB</span>
    ),
},
];


const rowSelection = {
selectedRowKeys, 
onChange: (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys); 
},
};


const selectedItems = data.filter((item) =>
selectedRowKeys.includes(item.id)
);
const totalSum = selectedItems.reduce(
(acc, item) => acc + (item.total || 0),
0
);

return (
<div className="p-4">
    <Input
    placeholder="Search by name"
    onChange={(e) => setSearchText(e.target.value)}
    style={{ marginBottom: "30px" }}
    />
    <Table
    rowSelection={rowSelection} 
    dataSource={filteredData}
    columns={columns}
    rowKey="id"
    pagination={{
        current: 1,
        pageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20"],
    }}
    className="shadow-lg rounded-lg"
    />

    <div className="mt-4">
    <h3>Total of selected items: {totalSum} THB</h3>
    </div>
</div>
);
};

export default SelectItem;
