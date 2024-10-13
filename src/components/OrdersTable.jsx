import React from "react";
import { Space, Table, Tag } from "antd";
const { Column } = Table;

const data = [
{
key: "1",
firstName: "John",
lastName: "Brown",
age: 32,
address: "New York No. 1 Lake Park",
tags: ["Urgent"],
},
{
key: "2",
firstName: "Jim",
lastName: "Green",
age: 42,
address: "London No. 1 Lake Park",
tags: ["Not Urgent"],
},
{
key: "3",
firstName: "Joe",
lastName: "Black",
age: 32,
address: "Sydney No. 1 Lake Park",
tags: ["Not Urgent"],
},
{
key: "4",
firstName: "Alice",
lastName: "Smith",
age: 28,
address: "Los Angeles No. 2 Lake Park",
tags: ["Urgent"],
},
{
key: "5",
firstName: "Bob",
lastName: "Johnson",
age: 35,
address: "Chicago No. 3 Lake Park",
tags: ["Not Urgent"],
},
{
key: "6",
firstName: "Eve",
lastName: "Davis",
age: 29,
address: "Miami No. 4 Lake Park",
tags: ["Not Urgent"],
},
{
key: "7",
firstName: "Charlie",
lastName: "Wilson",
age: 37,
address: "Dallas No. 5 Lake Park",
tags: ["Urgent"],
},
{
key: "8",
firstName: "Diana",
lastName: "Moore",
age: 26,
address: "San Francisco No. 6 Lake Park",
tags: ["Not Urgent"],
},
{
key: "9",
firstName: "Ethan",
lastName: "Taylor",
age: 31,
address: "Boston No. 7 Lake Park",
tags: ["Urgent"],
},
{
key: "10",
firstName: "Grace",
lastName: "Anderson",
age: 24,
address: "Seattle No. 8 Lake Park",
tags: ["Not Urgent"],
},
];

const DataTable = () => (
<Table
dataSource={data}
pagination={false}
style={{
    outline: "1px solid #e5e7eb", // เพิ่ม outline
    borderRadius: "5px", // เพิ่ม border radius
    overflow: "hidden", // ให้ border radius ทำงาน
}}
>
<Column title="First Name" dataIndex="firstName" key="firstName" />
<Column title="Last Name" dataIndex="lastName" key="lastName" />
<Column title="Age" dataIndex="age" key="age" />
<Column title="Address" dataIndex="address" key="address" />
<Column
    title="Tags"
    dataIndex="tags"
    key="tags"
    render={(tags) => (
    <>
        {tags.map((tag) => {
        let color = tag === "Urgent" ? "red" : "blue";
        return (
            <Tag color={color} key={tag}>
            {tag}
            </Tag>
        );
        })}
    </>
    )}
/>
<Column
    title="Action"
    key="action"
    render={(_, record) => (
    <Space size="middle">
        <a>Invite {record.lastName}</a>
    </Space>
    )}
/>
</Table>
);

export default DataTable;
