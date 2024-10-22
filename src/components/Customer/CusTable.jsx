import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Card, Tabs, Modal, Form } from "antd";
import qs from "qs";
import mockData from "../../assets/mockData.json";
import AddButton from "./AddCustomers";
import axios from "axios";

const { TabPane } = Tabs;

const getRandomuserParams = (params) => ({
results: params.pagination?.pageSize,
page: params.pagination?.current,
...params,
});

const CustomersDefault = () => {
const [data, setData] = useState([]);
const [testData, setTestData] = useState([]);
const [loading, setLoading] = useState(false);
const [searchText, setSearchText] = useState("");
const [tableParams, setTableParams] = useState({
pagination: {
    current: 1,
    pageSize: 10,
},
});
const [isEditing, setIsEditing] = useState(false);
const [editRecord, setEditRecord] = useState(null);
const [form] = Form.useForm();
const [activeTab, setActiveTab] = useState("1");

const fetchData = () => {
setLoading(true);
const useMockData = true;

if (useMockData) {
    setData(mockData);
    setLoading(false);
    setTableParams({
    ...tableParams,
    pagination: {
        ...tableParams.pagination,
        total: mockData.length, // Use the total length of mock data
    },
    });
} else {
    fetch(
    `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
    )}`
    )
    .then((res) => res.json())
    .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
        ...tableParams,
        pagination: {
            ...tableParams.pagination,
            total: 200,
        },
        });
    });
}
};

const handleSearch = (value) => {
setSearchText(value);
};

const handleReset = () => {
setSearchText("");
};

const filteredData = data.filter((record) =>
Object.values(record).some((field) =>
    String(field).toLowerCase().includes(searchText.toLowerCase())
)
);

useEffect(() => {
fetchData(); // Call fetchData
}, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

const handleTableChange = (pagination, filters, sorter) => {
setTableParams({
    pagination,
    filters,
    sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
    sortField: Array.isArray(sorter) ? undefined : sorter.field,
});

if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    setData([]);
}
};

const handleAddCustomer = (customer) => {
setData((prevData) => [...prevData, customer]);
};

const handleEdit = (record) => {
setEditRecord(record);
form.setFieldsValue(record);
setIsEditing(true);
};

const handleEditSave = () => {
form.validateFields().then((values) => {
    const updatedData = data.map((item) =>
    item["Customer ID"] === editRecord["Customer ID"]
        ? { ...item, ...values }
        : item
    );
    setData(updatedData);
    setIsEditing(false);
    setEditRecord(null);
});
};

const operationColumn = {
title: "Operation",
key: "operation",
width: "20%",
render: (record) => (
    <Space>
    <Button onClick={() => handleEdit(record)}>Edit</Button>
    </Space>
),
};

// Define your columns here
const customerColumns = [
{
    title: "Card ID",
    dataIndex: "Customer ID",
    key: "Customer ID",
    width: "10%",
},
{ title: "Name", dataIndex: "Name", key: "Name", width: "20%" },
{
    title: "Date of Birth",
    dataIndex: "Date of Birth",
    key: "Date of Birth",
    width: "15%",
},
{
    title: "Gender",
    dataIndex: "Gender",
    key: "Gender",
    width: "20%",
    filters: [
    { text: "Male", value: "Male" },
    { text: "Female", value: "Female" },
    ],
    onFilter: (value, record) => record.Gender === value,
},
{
    title: "Contact Information",
    dataIndex: "Contact Information",
    key: "Contact Information",
    width: "20%",
},
operationColumn,
];

const testColumns = [
{
    title: "Requested Test",
    dataIndex: "Requested Test",
    key: "Requested Test",
    width: "30%",
    filters: [
    { text: "Ultrasound", value: "Ultrasound" },
    { text: "CT Scan", value: "CT Scan" },
    { text: "MRI", value: "MRI" },
    { text: "X-Ray", value: "X-Ray" },
    { text: "Blood Test", value: "Blood Test" },
    ],
    onFilter: (value, record) => record["Requested Test"] === value,
},
{
    title: "Sample Type",
    dataIndex: "Sample Type",
    key: "Sample Type",
    width: "30%",
    filters: [
    { text: "Blood", value: "Blood" },
    { text: "Urine", value: "Urine" },
    { text: "Saliva", value: "Saliva" },
    ],
    onFilter: (value, record) => record["Sample Type"] === value,
},
{
    title: "Price",
    dataIndex: "Test Costs",
    key: "Test Costs",
    width: "30%",
    render: (cost) => `฿${cost.toFixed(2)}`,
},
operationColumn, // Add operation column
];

const handleTabChange = (key) => {
setActiveTab(key);
setEditRecord(null);
};

return (
<>
    <Card
    title={
        <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            outline: "1px solid #e5e7eb",
            borderRadius: "5px",
            color: "blue",
        }}
        >
        <Space>
            <Input
            placeholder="Search..."
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200 }}
            />
            <Button onClick={handleReset}>Reset</Button>
        </Space>
        <AddButton onAddCustomer={handleAddCustomer} />{" "}
        </div>
    }
    bordered={true}
    >
    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab="Customer Info" key="1">
        <Table
            columns={customerColumns}
            rowKey={(record) => record["Customer ID"]}
            dataSource={filteredData}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            scroll={{ x: 800 }}
        />
        </TabPane>
        <TabPane tab="Test Info" key="2">
        <Table
            columns={testColumns}
            rowKey={(record) => record["Requested Test"]}
            dataSource={filteredData}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            scroll={{ x: 1000 }}
        />
        </TabPane>
    </Tabs>

    <Modal
        title="Edit Record"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={[
        <Button key="cancel" onClick={() => setIsEditing(false)}>
            Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleEditSave}>
            Save
        </Button>,
        ]}
    >
        <Form form={form} layout="vertical">
        {activeTab === "1" && (
            <>
            <Form.Item
                name="Customer ID"
                label="Card ID"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Name"
                label="Name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Date of Birth"
                label="Date of Birth"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Gender"
                label="Gender"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Contact Information"
                label="Contact Information"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            </>
        )}
        {activeTab === "2" && (
            <>
            <Form.Item
                name="Requested Test"
                label="Requested Test"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Sample Type"
                label="Sample Type"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Test Costs"
                label="Price"
                rules={[{ required: true }]}
            >
                <Input type="number" />
            </Form.Item>
            </>
        )}
        </Form>
    </Modal>
    </Card>
</>
);
};

export default CustomersDefault;
