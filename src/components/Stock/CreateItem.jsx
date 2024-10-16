import React, { useEffect, useState } from "react";
import { Table, Input } from "antd"; 
import LabItems from "../../assets/LabItems.json";

const LabItemsTable = () => {
const [data, setData] = useState([]);
const [searchText, setSearchText] = useState(""); 

useEffect(() => {
setData(LabItems);
}, []);


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
];

return (
<div className="p-4">

    <Input
    placeholder="Search by name"
    onChange={(e) => setSearchText(e.target.value)}
    style={{ marginBottom: "30px" }} 
    />
    <Table
    dataSource={filteredData} 
    columns={columns}
    rowKey="id"
    pagination={false}
    className="shadow-lg rounded-lg"
    />
</div>
);
};

export default LabItemsTable;
