import React, { useEffect, useState } from "react";
import {
Button,
Input,
Space,
Table,
Card,
Tabs,
Modal,
Form,
Drawer,
Divider,
} from "antd"; 
import qs from "qs";
import mockData from "../../assets/mockData.json"; 
import AddButton from "./AddCustomers"; 

const { TabPane } = Tabs;

const getRandomuserParams = (params) => ({
results: params.pagination?.pageSize,
page: params.pagination?.current,
...params,
});

const CustomersDefault = () => {
const [data, setData] = useState([]);
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
const [drawerVisible, setDrawerVisible] = useState(false); 
const [selectedRecord, setSelectedRecord] = useState(null); 


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

const handleHide = (record) => {
setData(data.filter((item) => item !== record));
};

const handleEditSave = () => {
form.validateFields().then((values) => {
    const updatedData = data.map((item) =>
    item.HN === editRecord.HN ? { ...item, ...values } : item
    );
    setData(updatedData);
    setIsEditing(false);
    setEditRecord(null);
});
};


const showDrawer = (record) => {
setSelectedRecord(record);
setDrawerVisible(true);
};


const onClose = () => {
setDrawerVisible(false);
setSelectedRecord(null);
};


const operationColumn = {
title: "Operation",
key: "operation",
width: "20%",
render: (record) => (
    <Space>
    <Button onClick={() => handleEdit(record)}>Edit</Button>
    <Button onClick={() => handleHide(record)}>Hide</Button>
    </Space>
),
};

// Define your columns here
const customerColumns = [
{ title: "HN", dataIndex: "HN", key: "HN", width: "10%" },
{
    title: "Customer ID",
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
            rowKey={(record) => record.HN}
            dataSource={filteredData}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            onRow={(record) => ({
            onClick: () => showDrawer(record), // Show drawer on row click
            })}
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
            <Form.Item name="HN" label="HN" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="Customer ID"
                label="Customer ID"
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
                <Input type="date" />
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

    {/* Drawer for showing details */}
    <Drawer
    title="Record Details"
    placement="right"
    onClose={onClose}
    visible={drawerVisible}
    width={500}
    >
    {selectedRecord && (
        <div>
        {/* 1. Customer Information */}
        <h3
            style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#000000FF",
            }}
        >
            Customer Information
        </h3>
        <br></br>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            HN:
            </strong>{" "}
            {selectedRecord.HN}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Customer ID:
            </strong>{" "}
            {selectedRecord["Customer ID"]}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Name:
            </strong>{" "}
            {selectedRecord.Name}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Date of Birth:
            </strong>{" "}
            {selectedRecord["Date of Birth"]}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Age:
            </strong>{" "}
            {selectedRecord.Age}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Gender:
            </strong>{" "}
            {selectedRecord.Gender}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Contact Information:
            </strong>{" "}
            {selectedRecord["Contact Information"]}
        </p>
        <Divider />

        {/* 2. Medical Information */}
        <h3
            style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#000000FF",
            }}
        >
            Medical Information
        </h3>
        <br></br>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Doctor&apos;s Name:
            </strong>{" "}
            {selectedRecord["Doctor's Name"]}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Medical History:
            </strong>{" "}
            {selectedRecord["Medical History"]}
        </p>
        <Divider />

        {/* 3. Test Information */}
        <h3
            style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#000000FF",
            }}
        >
            Test Information
        </h3>
        <br></br>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Requested Test:
            </strong>{" "}
            {selectedRecord["Requested Test"]}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Sample Type:
            </strong>{" "}
            {selectedRecord["Sample Type"]}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Date of Sample Collection:
            </strong>{" "}
            {selectedRecord["Date of Sample Collection"]}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Lab Technician:
            </strong>{" "}
            {selectedRecord["Lab Technician"]}
        </p>
        <Divider />

        {/* 4. Test Results */}
        <h3
            style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#000000FF",
            }}
        >
            Test Results
        </h3>
        <br></br>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Date of Test Completion:
            </strong>{" "}
            {selectedRecord["Date of Test Completion"]}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Test Status:
            </strong>{" "}
            {selectedRecord["Test Status"]}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Test Results:
            </strong>{" "}
            {selectedRecord["Test Results"]}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Interpretation:
            </strong>{" "}
            {selectedRecord["Interpretation"]}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Reference Ranges:
            </strong>{" "}
            {selectedRecord["Reference Ranges"]}
        </p>
        <Divider />

        {/* 5. Notes & Recommendations */}
        <h3
            style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#000000FF",
            }}
        >
            Notes & Recommendations
        </h3>
        <br></br>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Remarks:
            </strong>{" "}
            {selectedRecord.Remarks}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Doctor&apos;s Recommendations:
            </strong>{" "}
            {selectedRecord["Doctor's Recommendations"]}
        </p>
        <Divider />

        {/* 6. Billing Information */}
        <h3
            style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#000000FF",
            }}
        >
            Billing Information
        </h3>
        <br></br>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Test Costs:
            </strong>{" "}
            {selectedRecord["Test Costs"]}
        </p>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Payment Status:
            </strong>{" "}
            {selectedRecord["Payment Status"]}
        </p>
        <Divider />

        {/* 7. Historical Data */}
        <h3
            style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#000000FF",
            }}
        >
            Historical Data
        </h3>
        <br></br>
        <p>
            <strong
            style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#000000FF",
            }}
            >
            Past Test Records:
            </strong>{" "}
            {selectedRecord["Past Test Records"]}
        </p>
        </div>
    )}
    </Drawer>
</>
);
};

export default CustomersDefault;
